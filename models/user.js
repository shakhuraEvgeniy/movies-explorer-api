const mongoose = require('mongoose');
const valid = require('validator');

const userShema = mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле "email" должно быть заплонено'],
    unique: [true, 'Поле "email" должно быть уникально'],
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
    required: [true, 'Поле "name" должно быть заплонено'],
    minlength: [2, 'Минимальная длина поля "name" - 2 символа'],
    maxlength: [30, 'Максимальная длина поля "name" - 30 символов'],
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userShema);
