const mongoose = require('mongoose');
const emailValidator = require('validator');
const bcrypt = require('bcryptjs');
const { AuthorizationError } = require('../utils/errorHandler');

const regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'*+,;=.]+$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return emailValidator.isEmail(v);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'User',
  },
});

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  try {
    const user = await this.findOne({ email }).select('+password');

    if (!user) {
      return Promise.reject(new AuthorizationError('Incorrect email or password'));
    }

    const pasVerification = await bcrypt.compare(password, user.password);

    if (!pasVerification) {
      return Promise.reject(new AuthorizationError('Incorrect email or password'));
    }

    return user;
  } catch (e) {
    return Promise.reject(new AuthorizationError('Incorrect email or password'));
  }
};

module.exports = mongoose.model('user', userSchema);
