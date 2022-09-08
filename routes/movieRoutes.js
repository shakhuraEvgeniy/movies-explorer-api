const express = require('express');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

const movieRouters = express.Router();

movieRouters.get('/', getMovies);
movieRouters.post('/', express.json(), createMovie);
movieRouters.delete('/:id', deleteMovie);

module.exports = movieRouters;
