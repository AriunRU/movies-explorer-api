const moviesRouter = require('express').Router();

const { getMoviesSavedByUser, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validation');

moviesRouter.get('/', getMoviesSavedByUser);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
