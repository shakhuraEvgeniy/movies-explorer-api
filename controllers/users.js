const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BedRequestError = require('../errors/BadRequestError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET } = process.env;

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, name } = await User.findById(_id).orFail(new NotFoundError('Пользователь с указанным id не существует'));
    res.send({ email, name });
  } catch (e) {
    next(e);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, name } = req.body;
    const user = await User.findByIdAndUpdate(
      _id,
      { email, name },
      { new: true, runValidators: true },
    ).orFail(new NotFoundError('Пользователь с указанным id не существует'));
    res.send(user);
  } catch (e) {
    if (e.code === 11000) {
      const err = new ConflictError('Пользователь с данным email уже зарегистрирован');
      next(err);
      return;
    }
    next(e);
  }
};

const createUser = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hash,
    });
    res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    });
  } catch (e) {
    if (e.code === 11000) {
      const err = new ConflictError('Пользователь с данным email уже зарегистрирован');
      next(err);
      return;
    }
    if (e.name === 'ValidationError') {
      const err = new BedRequestError('Переданы некорректные данные при создании пользователя');
      next(err);
      return;
    }
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email })
      .select('+password')
      .orFail(new UnauthorizedError('Задан некорректный email или пароль.'));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError('Задан некорректный email или пароль.');
    }
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );
    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      })
      .send({ _id: user._id });
  } catch (e) {
    if (e.name === 'noFoundEmail') {
      next(new UnauthorizedError('Задан некорректный email или пароль.'));
      return;
    }
    next(e);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('jwt').send({ message: 'Вы вышли из системы' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getUser, updateUser, logout, createUser, login,
};
