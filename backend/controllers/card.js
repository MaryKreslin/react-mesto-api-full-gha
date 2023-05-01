const Card = require('../models/card');
const ValidationErr = require('../errors/validationErr');
const NotFoundErr = require('../errors/notFoundErr');
const ForbiddenErr = require('../errors/forbiddenErr');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send({ data: cards }))
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id)
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Объект не найден');
      } else if (JSON.stringify(card.owner) !== JSON.stringify(req.user._id)) {
        throw new ForbiddenErr('Доступ запрещен!');
      } else {
        card.deleteOne()
          .then(() => {
            res.send({ message: 'Пост удален' });
          });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Объект не найден');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.deleteLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundErr('Объект не найден');
      }
      return res.send({ data: card });
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};
