const { celebrate, Joi } = require('celebrate');

const ValidateUrlRegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const validateCreateMovie = celebrate({
  body: Joi.object().keys({
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    duration: Joi.number().required(),
    description: Joi.string().required(),
    country: Joi.string().required(),
    director: Joi.string().required(),
    year: Joi.string().required(),
    movieId: Joi.number().required(),
    image: Joi.string().required().pattern(ValidateUrlRegExp),
    thumbnail: Joi.string().required().pattern(ValidateUrlRegExp),
    trailer: Joi.string().required().pattern(ValidateUrlRegExp),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex().required(),
  }),
});

const validateAuthorize = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
});

const validateRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(2).max(30).required(),
    password: Joi.string().required(),
  }),
});

module.exports = {
  ValidateUrlRegExp,
  validateUpdateProfile,
  validateCreateMovie,
  validateDeleteMovie,
  validateAuthorize,
  validateRegister,
};
