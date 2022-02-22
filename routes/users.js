const express = require('express');
const path = require('path');
const { getJsonFromFile } = require('../helpers/files');

const router = express.Router();
const usersPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {

  const users = getJsonFromFile(usersPath);
  res.send(users);
});

router.get('/:id', (req, res) => {
  const id = req.params;
  const usersList = getJsonFromFile(usersPath);
  const user = usersList.find((users) => users._id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send({ message: 'User ID not found' });
  }
  console.log(user);
});

module.exports = router;
