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
var Request = require('./request.model');
var User = require('./../user/user.model');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Get list of things
exports.request = function(req, res) {
  User.findOne({

  }, function (err, user) {
    if(err) { return handleError(res, err); }
  });

  // SMS requestor that it's been received
  if (req.user.phone){
    twilio.sendMessage({

        to: req.user.phone, // Any number Twilio can deliver to
        from: process.env.TWILIO_NUMBER, // A number you bought from Twilio and can use for outbound communication
        body: 'Your request for help has been received! Please allow up to an hour for a response, and we\'ll get back to you soon! -IBM Heroes' // body of the SMS message

    }, function(err, responseData) {
        if (err) {
          console.log(err)
          res.send(403, err)
        } else {
          res.send(204)
        }
    });
  } else {
    res.send(500, 'No phone number for user.')
  }


  // return all users
  User.find(function (err, user) {
    // score based on hours needed
    // score based on industry and service area
    // score based on number of requests tagged on
    // return top 5 users

    if(err) { return handleError(res, err); }
  });

  // SMS top 5 users and flag them as requested
  // if receive response, flag request as accepted, release all users' requested status, SMS requestor and responder with contact details
  //... and SMS all others that request has been accepted

  // End of week, SMS requestor and responder asking for rating
};

function handleError(res, err) {
  return res.send(500, err);
}
