'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var QuestionsSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Questions', QuestionsSchema);