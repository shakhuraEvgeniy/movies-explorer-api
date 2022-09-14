const mongoose = require('mongoose');
const valid = require('validator');
const {
  REQUIRED_COUNTRY,
  REQUIRED_DIRECTOR,
  REQUIRED_DURATION,
  REQUIRED_YEAR,
  REQUIRED_DESCRIPTION,
  REQUIRED_IMAGE,
  ERROR_URL_IMAGE,
  ERROR_URL_TRAILER,
  REQUIRED_TRAILER,
  REQUIRED_THUMBNAIL,
  ERROR_URL_THUMBNAIL,
  REQUIRED_MOVIEID,
  REQUIRED_NAMERU,
  REQUIRED_NAMEEN,
  REQUIRED_OWNER,
} = require('../utils/constants');

const movieShema = mongoose.Schema({
  country: {
    type: String,
    required: [true, REQUIRED_COUNTRY],
  },
  director: {
    type: String,
    required: [true, REQUIRED_DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, REQUIRED_DURATION],
  },
  year: {
    type: String,
    required: [true, REQUIRED_YEAR],
  },
  description: {
    type: String,
    required: [true, REQUIRED_DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, REQUIRED_IMAGE],
    validate: {
      validator(v) {
        return (valid.isURL(v));
      },
      message: ERROR_URL_IMAGE,
    },
  },
  trailerLink: {
    type: String,
    required: [true, REQUIRED_TRAILER],
    validate: {
      validator(v) {
        return (valid.isURL(v));
      },
      message: ERROR_URL_TRAILER,
    },
  },
  thumbnail: {
    type: String,
    required: [true, REQUIRED_THUMBNAIL],
    validate: {
      validator(v) {
        return (valid.isURL(v));
      },
      message: ERROR_URL_THUMBNAIL,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, REQUIRED_OWNER],
  },
  movieId: {
    type: Number,
    required: [true, REQUIRED_MOVIEID],
  },
  nameRU: {
    type: String,
    required: [true, REQUIRED_NAMERU],
  },
  nameEN: {
    type: String,
    required: [true, REQUIRED_NAMEEN],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieShema);
