const Card = require('../models/card');

module.exports.getCards = async (req, res) => {
  try {
    const cards = await Card.find();
    res.send(cards);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    res.status(500).send({ message: "An error has occurred on the server" });
  }
}

module.exports.createCard = async (req, res) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({ name, link, owner: req.user._id });

    if(!newCard) {
      res.status(500).send({ message: 'An error has occurred on the server - Else Error' });
    }

    res.send(newCard);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    res.status(500).send({ message: "An error has occurred on the server" });
  }
}

module.exports.deleteCard = async (req, res) => {
  try {
    const deleteCard = await Card.findByIdAndRemove(req.params.id);

    if(!deleteCard){
      res.status(500).send({ message: 'An error has occurred on the server - Else Error' });
    }

    res.send(deleteCard);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    res.status(500).send({ message: "An error has occurred on the server" });
  }
}
