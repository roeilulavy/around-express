const Card = require('../models/card');
const User = require('../models/user');
const {
  BadRequestError, NotFoundError,
} = require('../utils/errorHandler');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    if (cards) {
      res.status(200).send(cards);
    } else {
      throw new Error();
    }
  } catch (err) {
    next(err);
  }
};

module.exports.createCard = async (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  try {
    const user = await User.findById({ _id });
    const newCard = await Card.create({ name, link, owner: user });

    if (newCard) {
      res.status(200).send(newCard);
    } else {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const deleteCard = await Card.findByIdAndRemove(req.params.cardId);

    if (deleteCard) {
      res.status(200).send(deleteCard);
    }
    next(new NotFoundError('Card not found!'));
  } catch (err) {
    next(new BadRequestError('Invalid info was provided'));
  }
};

module.exports.likeCard = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: _id } },
      { new: true },
    );

    if (like) {
      res.status(200).send(like);
    } else if (like === null) {
      next(new NotFoundError('Card not found!'));
    } else {
      throw new Error();
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user } },
      { new: true },
    );

    if (dislike) {
      res.status(200).send(dislike);
    }
    next(new NotFoundError('Card not found!'));
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Invalid info was provided'));
      return;
    }
    next(err);
  }
};
