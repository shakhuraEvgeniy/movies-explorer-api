const express = require('express');
const { logout, createUser, login } = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const movieRouters = require('./movieRoutes');
const userRouters = require('./userRoutes');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', login);
routes.use(auth);
routes.use('/users', userRouters);
routes.use('/movies', movieRouters);
routes.post('/signout', logout);

module.exports = { routes };
