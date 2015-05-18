'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  requester: String,
  responder: String,
  status: String
});

module.exports = mongoose.model('Request', RequestSchema);
