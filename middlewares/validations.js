const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');
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
  INVALID_ID,
  REQUIRED_MOVIEID,
  REQUIRED_NAMERU,
  REQUIRED_NAMEEN,
  REQUIRED_EMAIL,
  INVALID_EMAIL,
  REQUIRED_PASSWORD,
  REQUIRED_NAME,
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
} = require('../utils/constants');

const validateObjectId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message(INVALID_ID);
    }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().messages({
      'any.required': REQUIRED_COUNTRY,
    }),
    director: Joi.string().required().messages({
      'any.required': REQUIRED_DIRECTOR,
    }),
    duration: Joi.number().required().messages({
      'any.required': REQUIRED_DURATION,
    }),
    year: Joi.string().required().messages({
      'any.required': REQUIRED_YEAR,
    }),
    description: Joi.string().required().messages({
      'any.required': REQUIRED_DESCRIPTION,
    }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(ERROR_URL_IMAGE);
    })
      .messages({
        'any.required': REQUIRED_IMAGE,
      }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(ERROR_URL_TRAILER);
    })
      .messages({
        'any.required': REQUIRED_TRAILER,
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message(ERROR_URL_THUMBNAIL);
    })
      .messages({
        'any.required': REQUIRED_THUMBNAIL,
      }),
    movieId: Joi.number().integer().required().messages({
      'any.required': REQUIRED_MOVIEID,
    }),
    nameRU: Joi.string().required().messages({
      'any.required': REQUIRED_NAMERU,
    }),
    nameEN: Joi.string().required().messages({
      'any.required': REQUIRED_NAMEEN,
    }),
  }),
});

const validateUpdateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message(INVALID_EMAIL);
    })
      .messages({
        'any.required': REQUIRED_EMAIL,
      }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': MIN_LENGTH_NAME,
        'string.max': MAX_LENGTH_NAME,
        'any.required': REQUIRED_NAME,
      }),
  }),
});

const validateCreateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message(INVALID_EMAIL);
    })
      .messages({
        'any.required': REQUIRED_EMAIL,
      }),
    password: Joi.string().required().messages({
      'any.required': REQUIRED_PASSWORD,
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': MIN_LENGTH_NAME,
        'string.max': MAX_LENGTH_NAME,
        'any.required': REQUIRED_NAME,
      }),
  }),
});

const validateLoginBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message(INVALID_EMAIL);
    })
      .messages({
        'any.required': REQUIRED_EMAIL,
      }),
    password: Joi.string().required().messages({
      'any.required': REQUIRED_PASSWORD,
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
