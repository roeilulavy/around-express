const express = require('express');
const router = express.Router();
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/', getCards);
router.post('/', createCard);
router.delete('/:card_id', deleteCard);

module.exports = router;
