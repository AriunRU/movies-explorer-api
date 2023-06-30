const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation');
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

router.get('/', getSavedMovies);

router.post('/', validateCreateMovie, createMovie);

router.delete('/:movieId', validateDeleteMovie, deleteMovieById);

module.exports = router;
