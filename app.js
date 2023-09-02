require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('./utils/rateLimit');
const errorHandler = require('./middlewares/errorHandler');
const NotFound = require('./errors/notFound');

const { PORT = 3000, NODE_ENV, MONGO_URL } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use(rateLimit);

app.use(require('./routes/index'));

app.use('*', (req, res, next) => {
  next(new NotFound('Page not found'));
});

app.use(errors());
app.use(errorHandler);

async function connect() {
  await mongoose.connect(MONGO_URL, {
  });

  await app.listen(PORT, () =>{
    console.log(`connected! on port ${PORT}`)
  });
}

connect();
