const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

const { validateCreateMovieData, validateDeleteMovieData } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovieData, createMovie);
router.delete('/:_id', validateDeleteMovieData, deleteMovie);

module.exports = router;
