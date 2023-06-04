const { Joi } = require('celebrate');

const signUpValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
};

const signInValidation = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
};

const getUserByIdValidation = {
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required(),
  }),
};

const updateUserProfileValidation = {
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
};

module.exports = {
  signUpValidation,
  signInValidation,
  getUserByIdValidation,
  updateUserProfileValidation,
};
