const router = require('express').Router();
const {
  getCards, createCard, deleteCard, putLike, deleteLike,
} = require('../controllers/card');

const { ValidateCard, ValidateCardId } = require('../middlewares/validateCard');

router.get('/', getCards);

router.post('/', ValidateCard, createCard);

router.delete('/:id', ValidateCardId, deleteCard);

router.put('/:id/likes', ValidateCardId, putLike);

router.delete('/:id/likes', ValidateCardId, deleteLike);

module.exports = router;
