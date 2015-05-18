'use strict';

var express = require('express');
var controller = require('./sms.controller');

var router = express.Router();

// Handle inbound SMS

router.post('/', controller.receive);

module.exports = router;
