const mongoose = require('mongoose');
const valid = require('validator');

const userShema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return (valid.isEmail(v));
      },
      message: 'Email задан не корректно',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userShema);
