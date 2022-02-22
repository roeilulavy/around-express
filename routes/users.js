const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const dataPath = path.join(__dirname, '..', 'data', 'users.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(500).send({ message: 'An error has occurred on the server' });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

router.get('/:id', (req, res) => {
  const id = req.params;

  fs.readFile(dataPath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.log(err); // eslint-disable-line no-console
      res.status(500).send({ message: 'An error has occurred on the server' });
      return;
    }
    const usersList = JSON.parse(data);
    const user = usersList.find((users) => users._id === id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User ID not found' });
    }
  });
});

module.exports = router;
