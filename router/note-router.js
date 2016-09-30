'use strict';

const Router = require('express').Router;
const createError = require('http-errors');
const jsonParser = require('body-parser').json();
const debug = require('debug')('noteA:note-router');

const Note = require('../model/note');

let noteRouter = module.exports = exports = new Router();

noteRouter.post('/note', jsonParser, function(req, res, next) {
  debug(' POST api/note');
  if(!req.body.name) return next(createError(400, 'failed, note needs a name'));
  new Note(req.body).save().then(note => {
    res.json(note);
  }).catch(next);
});

noteRouter.get('/note', function (req, res, next) {
  debug('GET api/note');
  Note.find({}).then(notes => res.send(notes)).catch(next);
});

noteRouter.get('/note/:id', function(req, res, next) {
  debug('GET api/note/:id');
  Note.findById(req.params.id)
  .then(note => {
    res.send(note);
  }).catch(err => {
    next(createError(404, err.mesage));
  });
});

noteRouter.put('/note:id', function(req, res, next) {
  debug('PUT api/note:id');
  Note.findByIdAndUpdate( req.params.id, req.body, {new: true})
  .then(note => {
    res.send(note);
  }).catch(next);
});

noteRouter.delete('/note:id', jsonParser, function(req, res, next) {
  debug('DELETE api/note:id');
  Note.findByIdAndRemove(req.params.id)
  .then(note => {
    res.json(note);
  }).catch(next);
});
