const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

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
    const { newEmail, newName } = await User.findByIdAndUpdate(
      _id,
      { email, name },
      { new: true, runValidators: true },
    ).orFail(new NotFoundError('Пользователь с указанным id не существует'));
    res.send({ newEmail, newName });
  } catch (e) {
    next(e);
  }
};

const logout = (req, res, next) => {
  try {
    res.clearCookie('JWT').send({ message: 'Вы вышли из системы' });
  } catch (e) {
    next(e);
  }
};

module.exports = { getUser, updateUser, logout };
