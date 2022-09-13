const mongoose = require('mongoose');
const valid = require('validator');
const {
  NOT_UNIQUE_EMAIL,
  REQUIRED_EMAIL,
  INVALID_EMAIL,
  REQUIRED_PASSWORD,
  REQUIRED_NAME,
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
} = require('../utils/constants');

const userShema = mongoose.Schema({
  email: {
    type: String,
    required: [true, REQUIRED_EMAIL],
    unique: [true, NOT_UNIQUE_EMAIL],
    validate: {
      validator(v) {
        return (valid.isEmail(v));
      },
      message: INVALID_EMAIL,
    },
  },
  password: {
    type: String,
    required: [true, REQUIRED_PASSWORD],
    select: false,
  },
  name: {
    type: String,
    required: [true, REQUIRED_NAME],
    minlength: [2, MIN_LENGTH_NAME],
    maxlength: [30, MAX_LENGTH_NAME],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userShema);
