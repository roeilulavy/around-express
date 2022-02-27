const { getJsonFromFile } = require('../helpers/files');
const path = require('path');
const User = require('../models/user');

const dataPath = path.join(__dirname, '..', 'data', 'users.json');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(dataPath);

    res.send(users);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const usersList = await getJsonFromFile(dataPath);
    const user = usersList.find((users) => users._id === req.params.user_id);

    if (!user) {
      res.status(404).send({ message: 'User ID not found' });
    }

    res.send(user);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const newUser = await User.create({name, about, avatar});

    if(!newUser) {
      res.status(500).send({ message: 'An error has occurred on the server - Else Error' });
    }

    res.send(newUser);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(500).send({ message: 'An error has occurred on the server - Catch Error' });
  }
}
