'use strict';

const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const createError = require('http-errors');
const debug = require('debug')('noteA:server');
const cors = require('cors');

//add you app modules
const handleError = require('./lib/handle-error');
const noteRouter = require('./router/note-router');

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost/notedev';

mongoose.promise = Promise;
mongoose.connect(mongoUri);

app.use(morgan('dev'));
app.use(cors());

app.use('/api', noteRouter);

app.all('*', function(req,res, next) {
  debug('server.all 404 route hit for');
  next(createError(404, `Error: ${req.method} :: ${req.url} is not a route`));
});

app.use(handleError);

app.listen(port, function(){
  debug(`server up on :: ${port}`);
});
