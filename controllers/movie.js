const mongoose = require('mongoose');

const { ERR_MESSAGE_CONFLICT_MOVIE_ID } = require('../constants/constants');

const Movie = require('../models/movies');
const NotFoundError = require('../customError/NotFoundError');
const BadRequestError = require('../customError/BadRequestError');
const ForbiddenError = require('../customError/ForbiddenError');
const ConflictError = require('../customError/ConflictError');

module.exports.getMovies = (req, res, next) => Movie.find({ owner: req.user._id })
  .then((movies) => res.send(movies))
  .catch(next);

module.exports.createMovie = (req, res, next) => {
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

  Movie.find({ owner: req.user._id, movieId })
    .then((movie) => {
      if (movie.length === 0) {
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
          .then((createdMovie) => {
            res.send(createdMovie);
          })
          .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
              const validationError = new BadRequestError();
              validationError.message = err.message;
              next(validationError);
            } else {
              next(err);
            }
          });
      } else {
        const conflictMovieErr = new ConflictError();
        conflictMovieErr.message = ERR_MESSAGE_CONFLICT_MOVIE_ID;
        next(conflictMovieErr);
      }
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;

  return Movie.findById(movieId)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((movie) => {
      if (movie.owner.movieId.toString() === req.user.movieId) {
        return movie.deleteOne();
      }
      throw new ForbiddenError();
    })
    .then((movie) => res.send(movie))
    .catch(next);
};
