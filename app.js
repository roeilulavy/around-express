const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const auth = require('./middleware/auth');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(helmet());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/aroundb');
mongoose.connection.once('error', () => console.error.bind(console, 'MongoDB Connection Error: '));// eslint-disable-line no-console

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use((req, res, next) => {
  req.user = {
    _id: '621b5c29207c59a9c3067902',
  };
  next();
});

// routes
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.get('/*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');// eslint-disable-line no-console
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));// eslint-disable-line no-console
});
