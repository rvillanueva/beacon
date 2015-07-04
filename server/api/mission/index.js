'use strict';

var express = require('express');
var controller = require('./mission.controller');
var auth = require('../../auth/auth.service');


var router = express.Router();

router.get('/', auth.hasRole('Admin'), controller.index);
router.get('/mine', auth.isAuthenticated(), controller.myIndex);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/new', auth.isAuthenticated(), controller.create); // Create a new mission
router.get('/find/:id', auth.isAuthenticated(), controller.matchUser); // Mission surfaces a user
router.post('/tag', auth.isAuthenticated(), controller.tagUser); // Mission tags a user
router.post('/user/tag', auth.isAuthenticated(), controller.tagMission); // User tags a mission
router.post('/user/find', auth.isAuthenticated(), controller.matchMission); // User finds a mission
router.post('/accept/:id', auth.isAuthenticated(), controller.accept); // Mission accepts a user
router.post('/cancel/:id', auth.isAuthenticated(), controller.abort); // Mission aborts


module.exports = router;
