'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.hasRole('admin'), controller.index);
router.get('/me', auth.isAuthenticated(), controller.mine);
router.post('/new', auth.isAuthenticated(), controller.request);

module.exports = router;
