'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  description: String,
  requester: String,
  responder: String,
  searching: Boolean,
  status: String,
  shortId: {
    type: String,
    unique: true
  },
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
  },
  requested: Array
});

module.exports = mongoose.model('Request', RequestSchema);
