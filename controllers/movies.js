const Movies = require('../models/movie');
const BedRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

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
      const err = new BedRequestError('Переданы некорректные данные при сохранеии видео');
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
      throw new ForbiddenError('Недостаточно прав для удаления.');
    }
    await movie.remove();
    // const movieDelete = await Movies.findOneAndRemove({ _id: req.params.id }).orFail(new NotFoundError('Видео с указанным _id не найдена.'));
    res.send(movie);
  } catch (e) {
    if (e.name === 'CastError') {
      const err = new BedRequestError('Видео с указанным _id не найдена.');
      next(err);
      return;
    }
    next(e);
  }
};

module.exports = { getMovies, createMovie, deleteMovie };
