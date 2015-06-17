'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  title: String,
  description: String,
  requester: String,
  responder: String,
  status: String,
  traits: {
    hours: Number,
    industry: String,
    service: String,
    skills: {}
  },
  times: {
    submitted: Date,
    responded: Date,
    completed: Date
  }
});

module.exports = mongoose.model('Request', RequestSchema);
