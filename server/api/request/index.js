'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.request);

module.exports = router;
