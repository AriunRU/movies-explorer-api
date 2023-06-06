const { celebrate, Joi } = require('celebrate');

const userRegisterValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userLoginValidation = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const userInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const userIdValidation = celebrate({
  params: Joi.object({
    id: Joi.string().hex().length(24),
  }),
});

module.exports = {
  userRegisterValidation,
  userLoginValidation,
  userInfoValidation,
  userIdValidation,
};
