const { Joi, celebrate } = require('celebrate');

const { urlRegex, passwordRegex } = require('../utils/constants');

const ValidateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(passwordRegex),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
  }),
});

const ValidateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(passwordRegex),
  }),
});

const ValidateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24),
  }),
});

const ValidateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const ValidateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegex),
  }),
});

module.exports = {
  ValidateSignin,
  ValidateSignup,
  ValidateUserId,
  ValidateProfile,
  ValidateAvatar,
};
