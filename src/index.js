const starter = require('./starter');
const config = require('./config.json');

let dbInstances = {};

const dynamodb = {
  start(options) {
    const instance = starter.start(options, config);
    dbInstances = {
      ...dbInstances,
      [instance.port]: {
        process: instance.proc,
        options,
      },
    };
    instance.proc.on('close', code => {
      if (code !== null && code !== 0) {
        console.error('DynamoDB Local failed to start with code', code);
      }
    });
    console.info(
      `Dynamodb Local Started, Visit: http://localhost:${instance.port}/shell`
    );
  },
  stop(port) {
    if (dbInstances[port]) {
      dbInstances[port].process.kill('SIGKILL');
      delete dbInstances[port];
    }
  },
  restart(port) {
    const { options } = dbInstances[port];
    this.stop(port);
    this.start(options);
    console.info(`Successfully restarted dynamodb local on port: ${port}`);
  },
};
module.exports = dynamodb;
