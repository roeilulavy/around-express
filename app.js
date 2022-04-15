const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');
const routers = require('./routes/routers');
const { handleErrors } = require('./middleware/handleErrors');
const { requestLogger, errorLogger } = require('./middleware/logger');

const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

mongoose.connect('mongodb://localhost:27017/aroundb');

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.disable('x-powered-by');

app.use(cors());
app.options('*', cors());

app.use(requestLogger);

// routes
app.use('/', routers);

app.use(errorLogger);
app.use(handleErrors);

routers.use(errors());

mongoose.connection.once('error', () => {
  console.error.bind(console, 'MongoDB Connection Error: ');// eslint-disable-line no-console
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');// eslint-disable-line no-console
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));// eslint-disable-line no-console
});
