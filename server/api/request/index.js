'use strict';

var express = require('express');
var controller = require('./request.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/mine', auth.isAuthenticated(), controller.myIndex);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/new', auth.isAuthenticated(), controller.request);

module.exports = router;
