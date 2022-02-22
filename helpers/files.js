const fs = require('fs')

const getJsonFromFile = (filePath) => {
  return fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
          console.log(err); // eslint-disable-line no-console
          res.status(500).send({ message: 'An error has occurred on the server' });
          return;
        }
        return JSON.parse(data);
  });
}

module.exports = {
  getJsonFromFile
};
