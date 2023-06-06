const movieRouter = require('express').Router();
const { getMyMovies, postMovie, deleteMovie } = require('../controllers/movie');
const { createMovieValidation, deleteMovieValidation } = require('../utils/validations/movieJoi');

movieRouter.get('/movies', getMyMovies);
movieRouter.post('/movies', createMovieValidation, postMovie);
movieRouter.delete('/movies/:movieId', deleteMovieValidation, deleteMovie);

module.exports = movieRouter;
