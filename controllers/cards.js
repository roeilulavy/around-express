const { getJsonFromFile } = require('../helpers/files');
const path = require('path');

const dataPath = path.join(__dirname, "..", "data", "cards.json");

const getCards = async (req, res) => {
  try {
    const cards = await getJsonFromFile(dataPath);
    res.send(cards);
  } catch (err) {
    console.error(err); // eslint-disable-line no-console
    res.status(500).send({ message: "An error has occurred on the server" });
  }
}

module.exports = {
  getCards
}