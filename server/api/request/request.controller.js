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

// Get request by id
exports.show = function(req, res) {
  Request.findById(req.params.id, function (err, request) {
    if(err) { return handleError(res, err); }
    if(!request) { return res.send(404); }
    return res.json(request);

  });
};

// Get list of my requests
exports.myIndex = function(req, res) {
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

  Request.create(newRequest, function(err, request) {
    if(err) { return handleError(res, err); }
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
    if (!request.requested){
      request.requested = []
    }
    // return all users
    User.find({}, 'name email phone traits hours', function (err, foundUsers) {
      var users = foundUsers;
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
        users[i].score = Math.abs(req.body.traits.hours - users[i].traits.hours) * -1 + users[i].traits.industry[req.body.traits.industry] + users[i].traits.service[req.body.traits.service];

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
      var tryNum = 0;
      var failedTries = 0;

      // SMS top 5 users and flag them as requested
      for (var j = tryNum * notifiedPer; (j < notifiedPer + failedTries) && (j < users.length); j++){
        if (users[j].phone){
          twilio.sendMessage({
              to: users[j].phone,
              from: process.env.TWILIO_NUMBER,
              body: 'A fellow IBMer needs your help! Your mission, if you choose to accept it: ' + req.body.description
          }, function(err, responseData) {
              if (err) {
                console.log(err)
              }
          });
          twilio.sendMessage({
              to: users[j].phone,
              from: process.env.TWILIO_NUMBER,
              body: 'To accept this mission, go to: ' + 'test'
          }, function(err, responseData2) {
              if (err) {
                console.log(err)
              }
          });
          var requested = {
            time: new Date()
            , user: users[j]._id
          }
          request.requested.push(requested)
          users[j].requested = true;
          users[j].save;
        } else {
          failedTries++;
        }

      }
      request.save(function (err) {
        if (err) { return handleError(res, err); }
        res.send(200, request);
      });
      // if receive response, flag request as accepted, release all users' requested status, SMS requestor and responder with contact details
      //... and SMS all others that request has been accepted


      if(err) { return handleError(res, err); }
    });

  });



  // End of week, SMS requestor and responder asking for rating
};

function handleError(res, err) {
  return res.send(500, err);
}
