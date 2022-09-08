const mongoose = require('mongoose');
const valid = require('validator');

const movieShema = mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Поле "country" должно быть заплонено'],
  },
  director: {
    type: String,
    required: [true, 'Поле "director" должно быть заплонено'],
  },
  duration: {
    type: Number,
    required: [true, 'Поле "duration" должно быть заплонено'],
  },
  year: {
    type: String,
    required: [true, 'Поле "year" должно быть заплонено'],
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заплонено'],
  },
  image: {
    type: String,
    required: [true, 'Поле "image" должно быть заплонено'],
    validate: {
      validator(v) {
        return (valid.isURL(v));
      },
      message: 'Ошибка в url постера к фильму',
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'Поле "trailerLink" должно быть заплонено'],
    validate: {
      validator(v) {
        return (valid.isURL(v));
      },
      message: 'Ошибка в url трейлера фильма',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Поле "thumbnail" должно быть заплонено'],
    validate: {
      validator(v) {
        return (valid.isURL(v));
      },
      message: 'Ошибка в url миниатюрного изображения постера к фильму',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Поле "owner" должно быть заплонено'],
  },
  movieId: {
    type: String,
    required: [true, 'Поле "movieId" должно быть заплонено'],
  },
  nameRU: {
    type: String,
    required: [true, 'Поле "nameRU" должно быть заплонено'],
  },
  nameEN: {
    type: String,
    required: [true, 'Поле "nameEN" должно быть заплонено'],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieShema);
