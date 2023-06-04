const { Joi } = require('celebrate');
const { REGEX } = require('../../constants/constants');

const createMovieValidation = {
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(REGEX),
    trailerLink: Joi.string().required().regex(REGEX),
    thumbnail: Joi.string().required().regex(REGEX),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
};

const deleteMovieValidation = {
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
};

module.exports = {
  createMovieValidation,
  deleteMovieValidation,
};
