const { Joi, celebrate } = require('celebrate');
const { URL_REGEX } = require('../utils/constants');

const ValidateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required().regex(URL_REGEX),
  }),
});

const ValidateCardId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
});

module.exports = { ValidateCard, ValidateCardId };
