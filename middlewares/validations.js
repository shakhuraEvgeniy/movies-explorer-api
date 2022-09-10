const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': 'Поле "country" должно быть заполнено',
    }),
    director: Joi.string().required().messages({
      'any.required': 'Поле "director" должно быть заполнено',
    }),
    duration: Joi.number().required().messages({
      'any.required': 'Поле "duration" должно быть заполнено',
    }),
    year: Joi.string().required().messages({
      'any.required': 'Поле "year" должно быть заполнено',
    }),
    description: Joi.string().required().messages({
      'any.required': 'Поле "description" должно быть заполнено',
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ошибка в url постера к фильму');
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ошибка в url трейлера фильма');
    })
      .messages({
        'any.required': 'Поле "trailerLink" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ошибка в url миниатюрного изображения постера к фильму');
    })
      .messages({
        'any.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id видео');
    }).messages({
      'any.required': 'Поле "movieId" должно быть заполнено',
    }),
    nameRU: Joi.string().required().messages({
      'any.required': 'Поле "nameRU" должно быть заполнено',
    }),
    nameEN: Joi.string().required().messages({
      'any.required': 'Поле "nameRU" должно быть заполнено',
    }),
  }),
});

const validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Email задан не корректно');
    })
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

const validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Email задан не корректно');
    })
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2 символа',
        'string.max': 'Максимальная длина поля "name" - 30 символов',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Email задан не корректно');
    })
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().messages({
      'any.required': 'Поле "password" должно быть заполнено',
    }),
  }),
});

module.exports = {
  validateObjectId,
  validateMovieBody,
  validateUpdateUserBody,
  validateCreateUserBody,
  validateLoginBody,
};
