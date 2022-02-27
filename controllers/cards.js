const { getJsonFromFile } = require('../helpers/files');
const path = require('path');
const Card = require('../models/card');

const dataPath = path.join(__dirname, "..", "data", "cards.json");

module.exports.getCards = async (req, res) => {
  try {
    const cards = await getJsonFromFile(dataPath);
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
