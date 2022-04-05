const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const allowedCors = [
  'http://roy-server.students.nomoreparties.sbs',
  'https://roy-server.students.nomoreparties.sbs',
  'http://www.roy-server.students.nomoreparties.sbs',
  'https://www.roy-server.students.nomoreparties.sbs',
  'http://api.roy-server.students.nomoreparties.sbs',
  'https://api.roy-server.students.nomoreparties.sbs',
  'localhost:3000',
];

const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

const handleAuthError = (res) => {
  res
    .status(401)
    .send({ message: 'Authorization Error' });
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(authorization)) {
    res.header('Access-Control-Allow-Origin', authorization);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    handleAuthError(res);
  }

  req.user = payload;

  next();
};
