'use strict';

var _ = require('lodash');
var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

var validationError = function(res, err) {
  return res.json(422, err);
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  User.find({}, 'name email traits phone title linkedin.pictureUrl linkedin.url', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Get list of users
 * restriction: 'admin'
 */
exports.all = function(req, res) {
  User.find({}, '-salt -hashedPassword -verification', function (err, users) {
    if(err) return res.send(500, err);
    res.json(200, users);
  });
};

/**
 * Creates a new user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({_id: user._id }, config.secrets.session, { expiresInMinutes: 60*5 });
    res.json({ token: token });
  });
};

/**
 * Get a single user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  User.findById(userId, function (err, user) {
    if (err) return next(err);
    if (!user) return res.send(401);
    res.json(user.profile);
  });
};

/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  User.findByIdAndRemove(req.params.id, function(err, user) {
    if(err) return res.send(500, err);
    return res.send(204);
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.json(401);
    if (user.verification){
      if (user.verification.phone){
        delete user.verification.phone.code
      }
      if (user.verification.email){
        delete user.verification.email.code
      }
    }
    res.json(user);
  });
};

/**
 * Update my info
 */
exports.updateProfile = function(req, res, next) {
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword -verification', function(err, user) {
    if (err) return next(err);
    if (!user) {
      return res.json(401);
    } else {
      var updated = _.merge(user, req.body);
      updated.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    }
  });
};



// Send verification text
exports.verifyPhone = function(req, res) {
  console.log(req.body)
  var userId = req.user._id;
  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) {
    console.log(user)
    if (err) return next(err);
    if (!user) {
      return res.json(401);
    } else {
      twilio.sendMessage({

          to: req.body.phone, // Any number Twilio can deliver to
          from: process.env.TWILIO_NUMBER, // A number you bought from Twilio and can use for outbound communication
          body: 'Welcome to IBM Heroes! To verify your phone number, please reply to this text with the number of hours you are available to respond to requests this week (0-50).' // body of the SMS message

      }, function(err, responseData) {

          if (!err) { // "err" is an error received during the request, if any
              console.log(responseData.from);
              console.log(responseData.body);

          }
      });
      if(!user.verification) {
        user.verification = {
          phone: req.body.phone
        }
      } else {
        user.verification.phone = req.body
      }

      user.save(function(err) {
        if (err) return validationError(res, err);
        res.send(200);
      });
    }
  });

};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};
