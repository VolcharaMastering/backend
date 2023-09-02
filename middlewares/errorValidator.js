const { celebrate, Joi } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validUrl = require('validator/lib/isURL');

const validId = (value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validLink = (value, helpers) => {
  if (validUrl(value)) {
    return value;
  }
  return helpers.error('any.invalid');
};

const validName = (value, helpers) => {
  if (!/[а-яА-Яa-zA-Z0-9-._~:/?#@!$&'()*+,;=]+?$/.test(value)) {
    return helpers.error('any.invalid');
  }
  return value;
};

const validateCreateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateUserId = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().custom(validId),
  }),
});

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  validateLogin,
  validateCreateUser,
  validateUserId,
  validateUpdateUser,
};
