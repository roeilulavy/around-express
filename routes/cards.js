const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  const dataPath = path.join(__dirname, '../data/cards.json');

  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(500).send({ message: 'An error has occurred on the server' });
      return;
    }
    const cards = JSON.parse(data);
    res.send(cards);
  });
});

module.exports = router;
