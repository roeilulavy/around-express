const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtsecret = 'sdfgsdf;sdfsdfd;sfsdfsdf;sdf';

const getToken = (userId) => jwt.sign({ id: userId }, jwtsecret);

const isAuthorized = (token) => {
  if (!token) {
    return Promise.resolve(false);
  }

  const { id } = jwt.verify(token, jwtsecret);

  return User.findOne({ email: id })
    .then((user) => !!user)
    .catch((err) => false);
};

module.exports = { getToken, isAuthorized };
