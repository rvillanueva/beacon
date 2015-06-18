'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.post('/', auth.isAuthenticated(), controller.index);
router.get('/mobile/:code', controller.verifyMobile);
router.get('/email/:code', controller.verifyEmail);

module.exports = router;
