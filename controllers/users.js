const bcrypt = require('bcrypt');
const { getToken, isAuthorized } = require('../utils/jwt');
const User = require('../models/user');

const SALT_ROUNDS = 10;

const VALIDATION_ERROE = 400;
const UNAUTHORIZED_ERROE = 401;
const NOTFOUND_ERROE = 404;
const CONFLICT = 409;
const SERVER_ERROE = 500;

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(VALIDATION_ERROE).send({ message: 'Invalid Email or Password' });
    }

    const login = await User.findOne({ email }).select('+password');

    if (!login) {
      res.status(UNAUTHORIZED_ERROE).send({ message: 'Invalid Email or Password' });
    } else {
      bcrypt.compare(password, login.password)
        .then((isSame) => {
          const token = getToken(email._id);
          if (isSame) {
            res.status(200).send({ token });
          } else {
            res.status(UNAUTHORIZED_ERROE).send({ message: 'Invalid Email or Password' });
          }
        });
    }
  } catch (err) {
    res.status(SERVER_ERROE).send({ message: `An error has occurred on the server: ${err}` });
  }
};

module.exports.createUser = async (req, res) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;

    if (!email || !password) {
      res.status(VALIDATION_ERROE).send({ message: 'Invalid Email or Password' });
    }

    const user = await User.findOne({ email }.select('+password'));

    if (user) {
      res.status(CONFLICT).send({ message: 'User already exist' });
    }

    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      email, password: hashedPassword, name, about, avatar,
    });

    if (!newUser) {
      res.status(VALIDATION_ERROE).send({ message: 'Invalid data passed to the methods for creating a user' });
    }

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROE).send(err);
    } else {
      res.status(SERVER_ERROE).send({ message: `An error has occurred on the server: ${err}` });
    }
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const authorized = isAuthorized(req.headers.authorization);

    if (authorized) {
      const users = await User.find({});
      res.send(users);
    } else {
      res.status(NOTFOUND_ERROE).send({ message: 'User ID not found' });
    }
  } catch (err) {
    res.status(SERVER_ERROE).send({ message: 'An error has occurred on the server' });
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
    res.status(SERVER_ERROE).send({ message: 'An error has occurred on the server' });
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
      res.status(SERVER_ERROE).send({ message: `An error has occurred on the server: ${err}` });
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
      res.status(SERVER_ERROE).send({ message: `An error has occurred on the server: ${err}` });
    }
  }
};
