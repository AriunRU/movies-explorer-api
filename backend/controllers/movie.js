const Movie = require('../models/movies');
const BadRequestError = require('../../utils/customError/BadRequestError');
const NotFoundError = require('../../utils/customError/NotFoundError');
const ForbiddenError = require('../../utils/customError/ForbiddenError');

const getMyMovies = (req, res, next) => {
  const idUser = req.user._id;
  Movie.find({ owner: idUser })
    .then((allMovies) => res.send(allMovies))
    .catch(next);
};

const postMovie = (req, res, next) => {
  const idUser = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: idUser,
  })
    .then((newMovie) => res.status(200).send(newMovie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError('Некорректные данные при сохранении фильма'));
      }
      return next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const idUser = req.user._id;
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('По указанному id фильм не найден'));
        return;
      }
      if (movie.owner.toString() === idUser) {
        Movie.deleteOne(movie._id)
          .then(() => {
            res.send({ message: 'Фильм удален' });
          }).catch((err) => {
            next(err);
          });
      } else {
        next(new ForbiddenError('У Вас нет прав на удаление данного фильма'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные'));
      }
      return next(err);
    });
};

module.exports = {
  getMyMovies, postMovie, deleteMovie,
};
