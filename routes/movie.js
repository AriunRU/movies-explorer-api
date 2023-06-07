const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation');

router.get('/', getMovies);
router.post('/', validateCreateMovie, createMovie);
router.delete('/:_id', validateDeleteMovie, deleteMovie);

module.exports = router;
