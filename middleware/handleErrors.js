const handleErrors = (err, req, res, next) => {
  console.log('handleError console');
  console.log(err);

  if (err.statusCode && err.message) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }

  // res.status(500).send({ message: `some thing went wrong with the server:  ${err.message}` });
  res.status(err.statusCode).send({ message: err.message });

  next();
};

module.exports = { handleErrors };
