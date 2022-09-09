const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateObjectId, validateMovieBody } = require('../middlewares/validations');

const movieRouters = express.Router();

movieRouters.get('/', getMovies);
movieRouters.post('/', validateMovieBody, express.json(), createMovie);
movieRouters.delete('/:id', validateObjectId, deleteMovie);

module.exports = movieRouters;
