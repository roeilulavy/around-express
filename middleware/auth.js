const { isAuthorized } = require('../utils/jwt');

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

module.exports.auth = (req, res, next) => {
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
    return res.status(401).send({ message: 'Authorization Required' });
  }

  const token = authorization.replace('Bearer', '');
  let payload;

  try {
    payload = isAuthorized(token);
  } catch (err) {
    return res.status(403).send({ message: 'Authorization Required' });
  }

  req.user = payload;

  next();
};
