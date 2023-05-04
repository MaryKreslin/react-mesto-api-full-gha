const { Joi, celebrate } = require('celebrate');

const { URL_REGEX, PASSWORD_REGEX } = require('../utils/constants');

const ValidateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(PASSWORD_REGEX),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(URL_REGEX),
  }),
});

const ValidateSignin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().regex(PASSWORD_REGEX),
  }),
});

const ValidateUserId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

const ValidateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const ValidateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(URL_REGEX).required(),
  }),
});

module.exports = {
  ValidateSignin,
  ValidateSignup,
  ValidateUserId,
  ValidateProfile,
  ValidateAvatar,
};
