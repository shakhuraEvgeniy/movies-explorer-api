const express = require('express');
const { getUser, updateUser } = require('../controllers/users');

const userRouters = express.Router();

userRouters.get('/me', getUser);
userRouters.patch('/me', express.json(), updateUser);

module.exports = userRouters;
