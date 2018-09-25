const path = require('path');

const rmdir = require('rmdir');

const fs = require('fs');

const absPath = (...p) => {
  if (path.isAbsolute(...p)) {
    return p;
  }
  return path.join(path.dirname(__filename), ...p);
};

// const removeDir = (relPath, callback) => {
//   const path = absPath(relPath);
//   rmdir(path, callback);
// };

// const createDir = relPath => {
//   if (!fs.existsSync(absPath(relPath))) {
//     fs.mkdirSync(absPath(relPath));
//   }
// };

module.exports = {
  absPath,
  // removeDir,
  // createDir,
};
