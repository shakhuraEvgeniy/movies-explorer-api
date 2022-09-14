const express = require('express');
const { getUser, updateUser } = require('../controllers/users');
const { validateUpdateUserBody } = require('../middlewares/validations');

const userRouters = express.Router();

userRouters.get('/me', getUser);
userRouters.patch('/me', express.json(), validateUpdateUserBody, updateUser);

module.exports = userRouters;
