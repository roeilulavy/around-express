const express = require('express');
const { getJsonFromFile } = require('../helpers/files');

const router = express.Router();

router.get('/', (req, res) => {
  const users = getJsonFromFile('../data/users.json');
  res.send(users);
});

router.get('/:id', (req, res) => {
  const id = req.params;
  const usersList = getJsonFromFile('../data/users.json');
  const user = usersList.find((users) => users._id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User ID not found' });
  }
});

module.exports = router;
