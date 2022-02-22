const express = require('express');
const { getJsonFromFile } = require('../helpers/files');

const router = express.Router();

router.get('/', (req, res) => {
  const cards = getJsonFromFile('../data/cards.json');
  res.send(cards);
});

module.exports = router;
