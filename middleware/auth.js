const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

function auth(req, res, next) {
  const { authorization } = req.headers;

  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      next(res.status(403).send({ message: 'Authorization Error' }));
    }

    const token = authorization.replace('Bearer ', '');

    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

    if (!payload) {
      next(res.status(401).send({ message: 'Authorization Error' }));
    }

    req.user = payload;
  } catch (error) {
    next(error);
  }

  next();
}

module.exports = { auth };
