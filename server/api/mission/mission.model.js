'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MissionSchema = new Schema({
  title: String,
  description: String,
  requester: String,
  open: Boolean,
  status: String, // Either Open, Complete, Canceled
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
  matches: [
    {
      user: String,
      userWants: Boolean,
      missionWants: Boolean,
      submitted: Date,
      responded: Date,
      chosen: Boolean
    }
  ]
});

module.exports = mongoose.model('Mission', MissionSchema);
