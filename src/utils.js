const path = require('path');

const absPath = (...p) => {
  if (path.isAbsolute(...p)) {
    return p;
  }
  return path.join(path.dirname(__filename), ...p);
};

module.exports = {
  absPath,
};
