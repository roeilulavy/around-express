const cardsRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateUrl } = require('../helpers/validator');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardsRouter.get('/', getCards);

cardsRouter.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateUrl),
  }),
}), createCard);

cardsRouter.delete('/:id', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), deleteCard);

cardsRouter.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), likeCard);

cardsRouter.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
}), dislikeCard);

module.exports = cardsRouter;
