const bcrypt = require('bcrypt');
const { getToken, isAuthorized } = require('../utils/jwt');
const User = require('../models/user');

const SALT_ROUNDS = 10;

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      next(res.status(400).send({ message: 'Invalid Email or Password' }));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      next(res.status(401).send({ message: 'Invalid Email or Password' }));
    } else {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          const token = getToken(user._id);
          if (matched) {
            res.status(200).send({ token });
          } else {
            res.status(401).send({ message: 'Invalid Email or Password' });
          }
        });
    }
  } catch (err) {
    next(res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
  }
};

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      email, password, name, about, avatar,
    } = req.body;

    if (!email || !password) {
      next(res.status(400).send({ message: 'Invalid Email or Password' }));
    }

    const user = await User.findOne({ email }).select('+password');

    if (user) {
      next(res.status(409).send({ message: 'User already exist' }));
    }

    const hashedPassword = bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await User.create({
      email, password: hashedPassword, name, about, avatar,
    });

    if (!newUser) {
      next(res.status(400).send({ message: 'Invalid data passed to the methods for creating a user' }));
    }

    res.send(newUser);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).send(err));
    } else {
      next(res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
    }
  }
};

module.exports.getUserInfo = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findOne({ id });

    if (user) {
      res.status(200).send(user);
    } else if (user === null) {
      next(res.status(404).send({ message: 'User ID not found' }));
    }
  } catch (e) {
    if (e.name === 'CastError') {
      next(res.status(404).send({ message: 'User ID not found' }));
      return;
    }
    next(e);
  }
};

module.exports.getUsers = async (req, res, next) => {
  try {
    const authorized = isAuthorized(req.headers.authorization);

    if (authorized) {
      const users = await User.find({});
      res.send(users);
    } else {
      next(res.status(404).send({ message: 'User ID not found' }));
    }
  } catch (err) {
    next(res.status(500).send({ message: 'An error has occurred on the server' }));
  }
};

module.exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.user_id);

    if (!user) {
      next(res.status(404).send({ message: 'User ID not found' }));
    }

    res.send(user);
  } catch (err) {
    next(res.status(500).send({ message: 'An error has occurred on the server' }));
  }
};

module.exports.updateProfile = async (req, res, next) => {
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
      next(res.status(400).send({ message: 'Invalid data passed to the methods for creating a user' }));
    }

    res.send(updateProfile);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).send(err));
    } else {
      next(res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
    }
  }
};

module.exports.updateAvatar = async (req, res, next) => {
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
      next(res.status(400).send({ message: 'Invalid data passed to the methods for creating a user' }));
    }

    res.send(updateAvatar);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).send(err));
    } else {
      next(res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
    }
  }
};
