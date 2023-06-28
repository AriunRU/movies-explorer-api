const router = require('express').Router();
const { validateCreateMovie, validateDeleteMovie } = require('../utils/validation');
const {
  getSavedMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');
// # возвращает все сохранённые текущим  пользователем фильмы
// GET /movies
router.get('/', getSavedMovies);

// POST /movies
router.post('/', validateCreateMovie, createMovie);

// # удаляет сохранённый фильм по id
// DELETE /movies/_id
router.delete('/:movieId', validateDeleteMovie, deleteMovieById);

module.exports = router;
