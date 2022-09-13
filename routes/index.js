const express = require('express');
const { logout, createUser, login } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const { auth } = require('../middlewares/auth');
const { validateCreateUserBody, validateLoginBody } = require('../middlewares/validations');
const { NOT_FOUND_PAGE } = require('../utils/constants');
const movieRouters = require('./movieRoutes');
const userRouters = require('./userRoutes');

const routes = express.Router();

routes.post('/signup', express.json(), validateCreateUserBody, createUser);
routes.post('/signin', express.json(), validateLoginBody, login);
routes.use(auth);
routes.use('/users', userRouters);
routes.use('/movies', movieRouters);
routes.post('/signout', logout);
routes.use('*', (req, res, next) => {
  const err = new NotFoundError(NOT_FOUND_PAGE);
  next(err);
});

module.exports = { routes };
