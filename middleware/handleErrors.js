const handleErrors = (err, req, res, next) => {
  if (err.statusCode && err.message) {
    res.status(err.statusCode).send({ message: err.message });
    next();
    return;
  }

  res.status(500).send({ message: `some thing went wrong with the server:  ${err.message}` });

  next();
//   const { statusCode = 500, message } = err;
//   res.status(statusCode).send({
//     message: statusCode === 500
//       ? 'An error occurred on the server' : message,
//   });
};

module.exports = { handleErrors };
