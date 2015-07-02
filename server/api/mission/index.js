'use strict';

var express = require('express');
var controller = require('./mission.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/mine', auth.isAuthenticated(), controller.myIndex);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/new', auth.isAuthenticated(), controller.create);
router.get('/user/:id', auth.isAuthenticated(), controller.findUser);
router.post('/request', auth.isAuthenticated(), controller.request);
router.post('/accept', auth.isAuthenticated(), controller.accept);
router.post('/cancel/:id', auth.isAuthenticated(), controller.cancel);


module.exports = router;
