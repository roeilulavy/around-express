const jwt = require('jsonwebtoken');
const User = require('../models/user');

const VALIDATION_ERROE = 400;
const UNAUTHORIZED_ERROE = 401;
const NOTFOUND_ERROE = 404;
const DEFAULT_ERROE = 500;

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const login = await User.findOne(email, password);

    if (!login) {
      res.status(UNAUTHORIZED_ERROE).send({ message: 'User Email or Password not found' });
    }

    res.send(login._id);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});

    res.send(users);
  } catch (err) {
    console.log(err); // eslint-disable-line no-console
    res.status(DEFAULT_ERROE).send({ message: 'An error has occurred on the server' });
  }
};

module.exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      res.status(NOTFOUND_ERROE).send({ message: 'User ID not found' });
    }

    res.send(user);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    res.status(DEFAULT_ERROE).send({ message: 'An error has occurred on the server' });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;

    const newUser = await User.create({
      email, password, name, about, avatar,
    });

    if (!newUser) {
      res.status(VALIDATION_ERROE).send({ message: 'Invalid data passed to the methods for creating a user' });
    }

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROE).send(err);
    } else {
      res.status(DEFAULT_ERROE).send({ message: `An error has occurred on the server: ${err}` });
    }
  }
};

module.exports.updateProfile = async (req, res) => {
  try {
    const { name, about } = req.body;
    const updateProfile = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateProfile) {
      res.status(VALIDATION_ERROE).send({ message: 'Invalid data passed to the methods for creating a user' });
    }

    res.send(updateProfile);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROE).send(err);
    } else {
      res.status(DEFAULT_ERROE).send({ message: `An error has occurred on the server: ${err}` });
    }
  }
};

module.exports.updateAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const updateAvatar = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateAvatar) {
      res.status(VALIDATION_ERROE).send({ message: 'Invalid data passed to the methods for creating a user' });
    }

    res.send(updateAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROE).send(err);
    } else {
      res.status(DEFAULT_ERROE).send({ message: `An error has occurred on the server: ${err}` });
    }
  }
};
