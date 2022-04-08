const Card = require('../models/card');

module.exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    next(res.status(500).send({ message: 'An error has occurred on the server' }));
  }
};

module.exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: req.user._id });

    if (!newCard) {
      next(res.status(400).send({ message: 'invalid data passed to the methods for creating a card' }));
    }

    res.send(newCard);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(res.status(400).send(err));
    } else {
      next(res.status(500).send({ message: `An error has occurred on the server: ${err}` }));
    }
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const deleteCard = await Card.findByIdAndRemove(req.params.cardId);

    if (!deleteCard) {
      next(res.status(404).send({ message: 'Card not found' }));
    }

    res.send(deleteCard);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    next(res.status(500).send({ message: 'An error has occurred on the server' }));
  }
};

module.exports.likeCard = async (req, res, next) => {
  try {
    const like = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );

    if (!like) {
      next(res.status(404).send({ message: 'Card not found' }));
    }

    res.send(like);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    next(res.status(500).send({ message: 'An error has occurred on the server' }));
  }
};

module.exports.dislikeCard = async (req, res, next) => {
  try {
    const dislike = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id } },
      { new: true },
    );

    if (!dislike) {
      next(res.status(404).send({ message: 'Card not found' }));
    }

    res.send(dislike);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    next(res.status(500).send({ message: 'An error has occurred on the server' }));
  }
};
