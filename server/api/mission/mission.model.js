'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MissionSchema = new Schema({
  description: String,
  requester: String,
  open: Boolean,
  status: String,
  traits: {
    hours: Number,
    quantity: Number,
    industry: String,
    service: String,
    skills: {},
    availableOn: Date
  },
  times: {
    submitted: Date,
    completed: Date
  },
  responders: Array,
  matches: [
    {
      user: String,
      accepted: Boolean,
      requested: Boolean,
      submitted: Date,
      responded: Date
    }
  ]
});

module.exports = mongoose.model('Mission', MissionSchema);
