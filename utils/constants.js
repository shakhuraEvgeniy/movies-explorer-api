const ERROR_DATA_VIDEO_CREATED = 'Переданы некорректные данные при сохранеии видео.';
const ERROR_ACCESS_REMOVE = 'Недостаточно прав для удаления.';
const NOT_FOUND_MOVIE = 'Видео с указанным _id не найдено.';
const NOT_FOUND_USER = 'Пользователь с указанным id не существует.';
const NOT_UNIQUE_EMAIL = 'Пользователь с данным email уже зарегистрирован.';
const ERROR_DATA_USER_CREATED = 'Переданы некорректные данные при создании пользователя.';
const ERROR_EMAIL_OR_PASSWORD = 'Задан некорректный email или пароль.';
const NEEN_AUTHORIZATION = 'Необходима авторизация';
const SERVER_ERROR = 'На сервере произошла ошибка';
const INVALID_ID = 'Невалидный id';
const REQUIRED_COUNTRY = 'Поле "country" должно быть заплонено';
const REQUIRED_DIRECTOR = 'Поле "director" должно быть заплонено';
const REQUIRED_DURATION = 'Поле "duration" должно быть заполнено';
const REQUIRED_YEAR = 'Поле "year" должно быть заплонено';
const REQUIRED_DESCRIPTION = 'Поле "description" должно быть заполнено';
const REQUIRED_IMAGE = 'Поле "image" должно быть заплонено';
const ERROR_URL_IMAGE = 'Ошибка в url постера к фильму';
const ERROR_URL_TRAILER = 'Ошибка в url трейлера фильма';
const REQUIRED_TRAILER = 'Поле "trailerLink" должно быть заплонено';
const REQUIRED_THUMBNAIL = 'Поле "thumbnail" должно быть заплонено';
const ERROR_URL_THUMBNAIL = 'Ошибка в url миниатюрного изображения постера к фильму';
const REQUIRED_MOVIEID = 'Поле "movieId" должно быть заполнено';
const REQUIRED_NAMERU = 'Поле "nameRU" должно быть заполнено';
const REQUIRED_NAMEEN = 'Поле "nameEN" должно быть заполнено';
const REQUIRED_OWNER = 'Поле "owner" должно быть заплонено';
const REQUIRED_EMAIL = 'Поле "email" должно быть заплонено';
const INVALID_EMAIL = 'Email задан не корректно';
const REQUIRED_PASSWORD = 'Поле "password" должно быть заполнено';
const REQUIRED_NAME = 'Поле "name" должно быть заплонено';
const MIN_LENGTH_NAME = 'Минимальная длина поля "name" - 2 символа';
const MAX_LENGTH_NAME = 'Максимальная длина поля "name" - 30 символов';
const NOT_FOUND_PAGE = 'Запрошена несуществующая страница.';
const EXIT_SYSTEM = 'Вы вышли из системы';

module.exports = {
  ERROR_DATA_VIDEO_CREATED,
  ERROR_ACCESS_REMOVE,
  NOT_FOUND_MOVIE,
  NOT_FOUND_USER,
  NOT_UNIQUE_EMAIL,
  ERROR_DATA_USER_CREATED,
  ERROR_EMAIL_OR_PASSWORD,
  NEEN_AUTHORIZATION,
  SERVER_ERROR,
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
  REQUIRED_OWNER,
  REQUIRED_EMAIL,
  INVALID_EMAIL,
  REQUIRED_PASSWORD,
  REQUIRED_NAME,
  MIN_LENGTH_NAME,
  MAX_LENGTH_NAME,
  NOT_FOUND_PAGE,
  EXIT_SYSTEM,
};
