const express = require('express');
const helmet = require('helmet');

const app = express();
app.use(helmet());

const { PORT = 3000 } = process.env;

const userRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.get('/*', (req, res) => {
  res.status(404).send({ message: 'Requested resource not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
