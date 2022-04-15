const routers = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middleware/auth');
const { NotFoundError } = require('../utils/errorHandler');

const { login, createUser } = require('../controllers/users');
const { cardsRouter } = require('./cards');
const { usersRouter } = require('./users');

routers.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);

routers.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }).unknown(true),
}), createUser);

// router.use(auth);

routers.use('/users', auth, usersRouter);
routers.use('/cards', auth, cardsRouter);

routers.get('/*', (req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = routers;
