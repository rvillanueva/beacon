'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  description: String,
  requester: String,
  responder: String,
  searching: Boolean,
  status: String,
  traits: {
    hours: Number,
    industry: String,
    service: String,
    skills: {}
  },
  times: {
    submitted: Date,
    completed: Date
  },
  matches: [
    {
      user: String,
      requested: Boolean,
      matched: Boolean,
      times: {
        requested: Date,
        matched: Date
      }
    }
  ]
});

module.exports = mongoose.model('Request', RequestSchema);
