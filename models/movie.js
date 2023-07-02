const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "country" обязательно к заполнению'],
    },
    director: {
      type: String,
      required: [true, 'Поле "director" обязательно к заполнению'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "duration" обязательно к заполнению'],
    },
    year: {
      type: String,
      required: [true, 'Поле "year" обязательно к заполнению'],
    },
    description: {
      type: String,
      required: [true, 'Поле "description" обязательно к заполнению'],
    },
    image: {
      type: String,
      required: [true, 'Поле "image" обязательно к заполнению'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введен некорректный URL',
      },
    },
    trailerLink: {
      type: String,
      required: [true, 'Поле "trailerLink" обязательно к заполнению'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введен некорректный URL',
      },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "thumbnail" обязательно к заполнению'],
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Введен некорректный URL',
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
      required: [true, 'Поле "nameRU" обязательно к заполнению'],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "nameEN" обязательно к заполнению'],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
