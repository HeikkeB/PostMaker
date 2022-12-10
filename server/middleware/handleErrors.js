const handleErrors = ((err, req, res) => {
  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({ message: statusCode === 500 ? 'Internal error has occurred' : message });
});

export default handleErrors;
