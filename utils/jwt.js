const jwt = require('jsonwebtoken');
const User = require('../models/user');

const jwtsecret = 'sdfgsdf;sdfsdfd;sfsdfsdf;sdf';

const getToken = (userId) => jwt.sign({ id: userId }, jwtsecret, { expiresIn: '7d' });

const isAuthorized = (token) => {
  if (!token) {
    return Promise.resolve(false);
  }

  const { id } = jwt.verify(token, jwtsecret);

  return User.findOne({ email: id })
    .then((user) => !!user)
    .catch((err) => {
      console.error(err); // eslint-disable-line no-console
      Promise.resolve(false);
    });
};

module.exports = { getToken, isAuthorized };
