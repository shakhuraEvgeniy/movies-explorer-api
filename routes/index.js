const express = require('express');
const { logout } = require('../controllers/users');
const movieRouters = require('./movieRoutes');
const userRouters = require('./userRoutes');

const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', login);
routes.use('/users', userRouters);
routes.use('/movies', movieRouters);
routes.get('/signout', logout);

module.exports = { routes };
