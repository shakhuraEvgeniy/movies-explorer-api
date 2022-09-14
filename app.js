const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
require('dotenv').config();
const cookieParser = require('cookie-parser');
const { routes } = require('./routes');
const { requestLogger, errorLoger } = require('./middlewares/logger');
const { errorHandler } = require('./middlewares/errorHandler');
const { apiLimiter } = require('./middlewares/apiLimiter');
const { cors } = require('./middlewares/cors');

const { DATABASE_ADDRESS = 'mongodb://localhost:27017/moviesdb' } = process.env;
const { PORT = 3000 } = process.env;
const app = express();

app.use(cors);
app.use(helmet());
mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cookieParser());
app.use(requestLogger);
app.use(apiLimiter);
app.use(routes);
app.use(errorLoger);
app.use(errors());
app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
