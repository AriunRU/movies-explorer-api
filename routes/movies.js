const moviesRouter = require('express').Router();

const {
  addMovie, getMovies, deleteMovie,
} = require('../controllers/movies');
const { validationAddMovie, validationMovieId } = require('../middlewares/validation');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', validationAddMovie, addMovie);
moviesRouter.delete('/:_id', validationMovieId, deleteMovie);

module.exports = moviesRouter;
