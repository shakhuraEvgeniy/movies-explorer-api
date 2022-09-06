const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb');

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
