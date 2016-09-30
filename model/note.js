'use strict';

const Promise = require('bluebird');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debug = require('debug')('noteA:note');

mongoose.Promise = Promise;

let noteSchema = Schema({
  name:    {type: String, required: true},
  content: {type: String, required: true}
});

module.exports = mongoose.model('Note', noteSchema);
