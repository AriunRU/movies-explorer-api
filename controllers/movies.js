const mongoose = require('mongoose');
const Movie = require('../models/movie');
const RequestError = require('../utils/errors/request-err');
const NotFoundError = require('../utils/errors/not-found-err');
const ForbiddenError = require('../utils/errors/forbidden-err');

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

const addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new RequestError('Переданы некорректные данные в форме добавления фильма'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail()
    .then((movie) => {
      if (req.user._id !== movie.owner.toString()) {
        return next(new ForbiddenError('Пользователи не могут удалять чужие Фильмы'));
      }
      return movie;
    })
    .then((movie) => Movie.deleteOne(movie))
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new RequestError('Переданы некорректные данные фильма при запросе'));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError('Запрашиваемые данные фильма не найдены'));
      }
      return next(err);
    });
};

module.exports = {
  addMovie, getMovies, deleteMovie,
};
