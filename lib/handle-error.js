'use strict';

const createError = require('http-errors');
const debug = require('debug')('NoteA:handle-error');

module.exports = function handleErrors(err, req, res, next){
  console.error(err.message);
  debug('handleError!', err.message);
  if (err.status && err.name) {
    res.status(err.status).send(err.name);
    return next();
  }

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
};
