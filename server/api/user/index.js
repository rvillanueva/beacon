'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('user'), controller.index);
router.get('/all', auth.hasRole('admin'), controller.all);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.patch('/me', auth.hasRole('user'), controller.updateProfile);
//router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.hasRole('user'), controller.show);
router.post('/', controller.create);

module.exports = router;
