const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const { DATABASE_ADDRESS } = process.env;

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect(DATABASE_ADDRESS, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
