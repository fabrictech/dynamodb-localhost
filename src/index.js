const installer = require('./installer');

const starter = require('./starter');

const utils = require('./utils');

const config = require('./config.json');

const dbInstances = {};

const dynamodb = {
  // install(callback, path) {
  //   if (path) {
  //     config.setup.install_path = path;
  //   }
  //   installer.install(config, msg => {
  //     console.log(msg);
  //     callback();
  //   });
  // },
  start(options) {
    const instance = starter.start(options, config);
    dbInstances[instance.port] = {
      process: instance.proc,
      options,
    };
    instance.proc.on('close', code => {
      if (code !== null && code !== 0) {
        console.log('DynamoDB Local failed to start with code', code);
      }
    });
    console.log(
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
    console.log(`Successfully restarted dynamodb local on port: ${port}`);
  },
  // remove(callback) {
  //   utils.removeDir(config.setup.install_path, () => {
  //     console.log('Successfully removed dynamodb local!');
  //     callback();
  //   });
  // },
};
module.exports = dynamodb;
