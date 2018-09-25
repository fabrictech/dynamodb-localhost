const tar = require('tar');

const zlib = require('zlib');

const path = require('path');

const http = require('http');

const fs = require('fs');

const ProgressBar = require('progress');

const utils = require('./utils');

const download = function(downloadUrl, installPath, callback) {
  console.info(
    'Started downloading Dynamodb-local. Process may take few minutes.'
  );
  http
    .get(downloadUrl, response => {
      const len = parseInt(response.headers['content-length'], 10);

      const bar = new ProgressBar(
        'Downloading dynamodb-local [:bar] :percent :etas',
        {
          complete: '=',
          incomplete: ' ',
          width: 40,
          total: len,
        }
      );

      if (response.statusCode != 200) {
        throw new Error(
          `Error getting DynamoDb local latest tar.gz location ${
            response.headers.location
          }: ${response.statusCode}`
        );
      }

      response
        .pipe(zlib.Unzip())
        .pipe(
          tar.Extract({
            path: installPath,
          })
        )
        .on('data', chunk => {
          bar.tick(chunk.length);
        })
        .on('end', () => {
          callback('\n Installation complete!');
        })
        .on('error', err => {
          throw new Error(`Error in downloading Dynamodb local ${err}`);
        });
    })
    .on('error', err => {
      throw new Error(`Error in downloading Dynamodb local ${err}`);
    });
};

const install = function(config, callback) {
  const install_path = utils.absPath(config.setup.install_path);

  const jar = config.setup.jar;

  const download_url = config.setup.download_url;

  try {
    if (fs.existsSync(path.join(install_path, jar))) {
      callback('Dynamodb is already installed on path!');
    } else {
      utils.createDir(config.setup.install_path);
      download(download_url, install_path, callback);
    }
  } catch (err) {
    throw new Error(`Error configuring or installing Dynamodb local ${err}`);
  }
};
module.exports.install = install;
