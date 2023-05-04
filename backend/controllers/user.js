require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidationErr = require('../errors/validationErr');
const NotFoundErr = require('../errors/notFoundErr');
const ConflictErr = require('../errors/conflictErr');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key',
        { expiresIn: '7d' },
      );
      res.send({ token });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      console.log(err.message);
      next(err);
    });
};

function getUser(userId, req, res, next) {
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь не найден');
      }
      res.send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
}

module.exports.getCurentUser = (req, res, next) => {
  getUser(req.user._id, req, res, next);
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      res.status(201).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
          _id: user._id,
        },
      });
    })
    .catch((error) => {
      if (error.code === 11000) {
        next(new ConflictErr('Пользователь уже существует!'));
      } else if (error instanceof mongoose.Error.ValidationError) {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
};

module.exports.getUserOnId = (req, res, next) => {
  getUser(req.params.id, req, res, next);
};

function patchUser(userData, req, res, next) {
  User.findByIdAndUpdate(
    req.user._id,
    userData,
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundErr('Пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new ValidationErr('Переданы некорректные данные'));
      } else {
        next(error);
      }
    });
}

module.exports.patchProfile = (req, res, next) => {
  patchUser({ name: req.body.name, about: req.body.about }, req, res, next);
};

module.exports.patchAvatar = (req, res, next) => {
  patchUser({ avatar: req.body.avatar }, req, res, next);
};
