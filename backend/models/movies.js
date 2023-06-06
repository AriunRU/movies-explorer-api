const mongoose = require('mongoose');
const { REGEX } = require('../constants/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(values) {
        return REGEX.test(values);
      },
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(values) {
        return REGEX.test(values);
      },
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator(values) {
        return REGEX.test(values);
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model('movie', movieSchema);
