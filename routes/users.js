const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { getJsonFromFile } = require('../helpers/files');

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
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

  router.get("/", (req, res) => {
=======
router.get("/", (req, res) => {
>>>>>>> parent of 2e21527 (lint fix)
=======
router.get("/", (req, res) => {
>>>>>>> parent of 2e21527 (lint fix)
=======
router.get("/", (req, res) => {
>>>>>>> parent of 2e21527 (lint fix)
  const dataPath = path.join(__dirname, '../data/users.json');

  fs.readFile(dataPath, {encoding: 'utf8'}, (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).send({ "message": "An error has occurred on the server" });
      return;
    }
    const users = JSON.parse(data);
    res.send(users);
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const dataPath = path.join(__dirname, '../data/users.json');

  fs.readFile(dataPath, {encoding: 'utf8'}, (err, data) => {
    if(err) {
      console.log(err);
      res.status(500).send({ "message": "An error has occurred on the server" });
      return;
    }
    const usersList = JSON.parse(data);
    const user = usersList.find((users) => users._id === id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ "message": "User ID not found" });
    }
  });
});

module.exports = router;