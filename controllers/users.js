const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res
      .status(500)
      .send({ message: 'An error has occurred on the server' });
  }
}

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      res
        .status(404)
        .send({ message: 'User ID not found' });
    }

    res.send(user);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res
      .status(500)
      .send({ message: 'An error has occurred on the server' });
  }
}

module.exports.createUser = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;

    const newUser = await User.create({ name, about, avatar });

    if (!newUser) {
      res
        .status(400)
        .send({ message: 'Invalid data passed to the methods for creating a user' });
    }

    res.send(newUser);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res
      .status(500)
      .send({ message: 'An error has occurred on the server - Catch Error' });
  }

}
