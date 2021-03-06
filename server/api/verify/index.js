'use strict';

var express = require('express');
var controller = require('./verify.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.post('/email', auth.isAuthenticated(), controller.email);
router.post('/email/:code', controller.verifyEmail);

module.exports = router;
