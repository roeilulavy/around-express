const handleErrors = (err, req, res, next) => {
  if (err.statusCode && err.message) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }

  // res.status(500).send({ message: `some thing went wrong with the server:  ${err.message}` });
  res.status(500).send({ message: `some thing went wrong with the server:  ${err}` });

  next();
};

module.exports = { handleErrors };
