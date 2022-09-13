const Movies = require('../models/movie');
const BedRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { ERROR_DATA_VIDEO_CREATED, ERROR_ACCESS_REMOVE, NOT_FOUND_MOVIE } = require('../utils/constants');

const getMovies = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const movies = await Movies.find({ owner: _id });
    res.send(movies);
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
    } = req.body;
    const owner = req.user._id;
    const movie = await Movies.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      owner,
      nameRU,
      nameEN,
      movieId,
    });
    res.send(movie);
  } catch (e) {
    if (e.name === 'ValidationError') {
      const err = new BedRequestError(ERROR_DATA_VIDEO_CREATED);
      next(err);
      return;
    }
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movies.findOne({ _id: req.params.id }).orFail(new NotFoundError('Видео с указанным _id не найдена.'));
    if (String(movie.owner._id) !== req.user._id) {
      throw new ForbiddenError(ERROR_ACCESS_REMOVE);
    }
    await movie.remove();
    res.send(movie);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new BedRequestError(NOT_FOUND_MOVIE);
      next(err);
      return;
    }
    next(e);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
