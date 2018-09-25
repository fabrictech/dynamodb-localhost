const { spawn } = require('child_process');
const utils = require('./utils');

const starter = {
  start(options, config) {
    /* Dynamodb local documentation http://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html */
    const additionalArgs = [];

    const port = options.port || config.start.port;

    const dbDir =
      options.install_path || utils.absPath(config.setup.install_path);

    const { jar } = config.setup;

    if (options.dbPath) {
      additionalArgs.push('-dbPath', options.dbPath);
    } else {
      additionalArgs.push('-inMemory');
    }
    if (options.sharedDb) {
      additionalArgs.push('-sharedDb');
    }
    if (options.cors) {
      additionalArgs.push('-cors', options.cors);
    }
    if (options.delayTransientStatuses) {
      additionalArgs.push('-delayTransientStatuses');
    }
    if (options.optimizeDbBeforeStartup) {
      additionalArgs.push('-optimizeDbBeforeStartup');
    }
    if (options.help) {
      additionalArgs.push('-help');
    }

    const args = [
      `-Djava.library.path=${dbDir}/DynamoDBLocal_lib`,
      '-jar',
      jar,
      '-port',
      port,
      ...additionalArgs,
    ];

    const child = spawn('java', args, {
      cwd: dbDir,
      env: process.env,
      stdio: ['pipe', 'pipe', process.stderr],
    });

    if (!child.pid) {
      throw new Error('Unable to start DynamoDB Local process!');
    }

    child.on('error', code => {
      throw new Error(code);
    });

    return {
      proc: child,
      port,
    };
  },
};

module.exports = starter;
