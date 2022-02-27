const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

const app = express();
app.use(helmet());
app.use(bodyParser.json());

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/aroundb');

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use((req, res, next) => {
  req.user = {
    _id: '621b5c29207c59a9c3067902'
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.get('/*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`); // eslint-disable-line no-console
});
