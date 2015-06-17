/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var User = require('./../user/user.model');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Receive a text
exports.receive = function(req, res) {
  console.log(req.body);
  User.find({
    phone: req.body.from
  }, function (err, user) {
    if(!user){
      User.verification.find({
        phone: req.body.from
      }, function(err, user){
        if (!user){
          twilio.sendMessage({

              to: req.body.from,
              from: process.env.TWILIO_NUMBER,
              body: 'Sorry, this phone number is not tied to a verified account. To use the IBM Heroes service, please register at http://heroes.stage1.mybluemix.net/ within the IBM system.'

          }, function(err, responseData) {

              if (!err) {
              }
          });
          res.json(404, 'No user with a phone number of ' + req.body.from + ' found.');
        } else {
          twilio.sendMessage({

              to: req.body.from,
              from: process.env.TWILIO_NUMBER,
              body: 'Congrats! You have verified this phone number. Welcome to IBM Heroes!'

          }, function(err, responseData) {

              if (!err) {
              }
          });
          user.phone = user.verification.phone;
          user.role = 'user';
          user.save(function(err) {
            if (err) return validationError(res, err);
            res.send(200);
          });
        }
      })
    }

    if(err) { return handleError(res, err); }
    return res.json(200, requests);
    });
};

function handleError(res, err) {
  return res.send(500, err);
}
