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
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }

  next();
};
