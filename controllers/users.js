const { getJsonFromFile } = require('../helpers/files');
const path = require('path');


const dataPath = path.join(__dirname, '..', 'data', 'users.json');

const getUsers = async (req, res) => {
  try {
    const users = await getJsonFromFile(dataPath);

    res.send(users);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(500).send({ message: 'An error has occurred on the server' });
  }
}

const getUserById = async (req, res) => {
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

module.exports = {
  getUsers,
  getUserById
}