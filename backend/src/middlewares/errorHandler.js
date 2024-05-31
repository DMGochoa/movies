const { ValidationError } = require('sequelize');

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      message: err.message,
      errors: err.errors.map((e) => ({
        message: e.message,
        field: e.path
      }))
    });
  }
  next(err);
}

function boomErrorHandler(err, req, res, next) {
  console.log(err.isBoom, 'Estamos en el middleware de boom');
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
}

module.exports = { boomErrorHandler, errorHandler, ormErrorHandler };
