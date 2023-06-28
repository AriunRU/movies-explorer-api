const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const Movie = require('../models/movie');
const { handleError } = require('../ustils/handleError');
const {
  FORBIDDEN_MESSAGE,
  NOT_FOUND_MESSAGE,
  DELETE_MESSAGE,
  OK_CODE,
  CREATED_CODE,
} = require('../ustils/config');

const getMoviesSavedByUser = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate('owner')
    .then((movies) => {
      res.status(OK_CODE).send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
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
  }).then((newMovie) => {
    Movie.findById(newMovie._id)
      .populate('owner')
      .then((createdMovie) => res.status(CREATED_CODE).send(createdMovie))
      .catch((err) => handleError(err, next));
  }).catch((err) => handleError(err, next));
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND_MESSAGE);
      }
      if (movie.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError(FORBIDDEN_MESSAGE);
      }
      return movie.deleteOne();
    })
    .then(() => res.status(OK_CODE).send({ message: DELETE_MESSAGE }))
    .catch((err) => handleError(err, next));
};

module.exports = {
  getMoviesSavedByUser,
  createMovie,
  deleteMovie,
};
