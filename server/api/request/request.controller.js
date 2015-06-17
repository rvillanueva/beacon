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

var notifiedPer = 5;

// Get list of requests
exports.index = function(req, res) {
  Request.find(function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};

// Get list of my requests
exports.mine = function(req, res) {
  Request.find({requester: req.user._id}, function (err, requests) {
    if(err) { return handleError(res, err); }
    return res.json(200, requests);
  });
};


// Post a request
exports.request = function(req, res) {

  var newRequest = {
    requester: req.user._id,
    title: req.body.title,
    description: req.body.description,
    traits: req.body.traits,
    times: {
      submitted: new Date()
    }
  }

  Request.create(req.body, function(err, thing) {
    if(err) { return handleError(res, err); }
    return res.json(201, thing);
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
        }
    });
  }

  // return all users
  User.find(function (err, foundUsers) {
    var users = foundUsers;
    console.log(foundUsers)
    for (var i = 0; i < users.length; i++){
      // score based on hours needed
      // score based on industry and service area
      // score based on number of requests tagged
      if(!users[i].traits.industry){
        users[i].traits.industry = {}
      }
      if(!users[i].traits.service){
        users[i].traits.service = {}
      }
      users[i].score = Math.abs(req.body.hours - users[i].hours) * -1 + users[i].traits.industry[req.body.industry] + users[i].traits.service[req.body.service];

    }

    users.sort(function (a, b) {
      if (a.score > b.score) {
        return 1;
      }
      if (a.score < b.score) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    console.log(users)

    var tryNum = 0;
    var failedTries = 0;

    // SMS top 5 users and flag them as requested
    for (var j = tryNum * notifiedPer; (j < notifiedPer + failedTries) && (j < users.length); j++){
      if (users[j].phone){
        twilio.sendMessage({

            to: users[j].phone,
            from: process.env.TWILIO_NUMBER,
            body: 'A fellow IBMer needs your help! Hours requested: ' + req.body.hours + '. Industry: ' + req.body.industry + '. Service Area: ' + req.body.service + '. Description: ' + req.body.description + '. ---------- To accept this mission, respond YES. To stop receiving requests, respond STOP.'

        }, function(err, responseData) {
            if (err) {
              console.log(err)
            } else {
              users[j].requested = true;
              users[j].save;
            }
        });
      } else {
        failedTries++;
      }

    }

    // if receive response, flag request as accepted, release all users' requested status, SMS requestor and responder with contact details
    //... and SMS all others that request has been accepted


    if(err) { return handleError(res, err); }
  });
  res.send(200);


  // End of week, SMS requestor and responder asking for rating
};

function handleError(res, err) {
  return res.send(500, err);
}
