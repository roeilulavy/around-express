const { status } = require('express/lib/response');
const fs = require('fs')

const getJsonFromFile = (filePath) => {
  return fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
          console.log(err); // eslint-disable-line no-console

          return({ message: 'An error has occurred on the server' });
        }
        return JSON.parse(data);
  });
}

module.exports = {
  getJsonFromFile
};
