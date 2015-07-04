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
var Mission = require('./mission.model');
var User = require('./../user/user.model');
var twilio = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_SECRET,
  domain: process.env.MAILGUN_URL
});

// Get list of requests
exports.index = function(req, res) {
  Mission.find(function(err, missions) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, missions);
  });
};

// Get list of my requests
exports.myIndex = function(req, res) {
  Mission.find({
    requester: req.user._id
  }, function(err, missions) {
    if (err) {
      return handleError(res, err);
    }
    return res.json(200, missions);
  });
};


// Get request by id
exports.show = function(req, res) {
  Mission.findById(req.params.id, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }
    return res.json(mission);

  });
};


// Create a request
exports.create = function(req, res) {

  var newMission = {
    requester: req.user._id,
    title: req.body.title,
    description: req.body.description,
    traits: req.body.traits,
    times: {
      submitted: new Date()
    },
    open: true
  }

  Mission.create(newMission, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    console.log(mission)
    mission.save();
    return res.json(200, mission)
  });
  // End of week, SMS requestor and responder asking for rating

};

// Show relevant user who the mission hasn't yet seen
exports.matchUser = function(req, res) {
  Mission.findById(req.params.id, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }
    if(mission.requester !== req.user._id){
      console.log(mission.requester)
      console.log(req.user._id)
    }

    var skipped = 0;

    User.find('-hashedPassword -salt').lean().exec(function(err, foundUsers) {
      var users = foundUsers;
      if (err) {
        return handleError(res, err);
      }
      var matchedUser;
      for (var i = 0; i < users.length; i++) {
        // score based on hours needed
        // score based on industry and service area
        // score based on number of requests tagged
        if(!mission.traits.hours){
          mission.traits.hours = 0;
        }
        if(!users[i].traits){
          users[i].traits = {}
        }
        if(!users[i].traits.hours){
          users[i].traits.hours = 0;
        }
        if(!users[i].traits.industry){
          users[i].traits.industry = {}
        }
        if(!users[i].traits.service){
          users[i].traits.service = {}
        }
        // In case specific industry or service are undefined
        var industryScore = users[i].traits.industry[mission.traits.industry];
        industryScore = industryScore || 0;
        var serviceScore = users[i].traits.service[mission.traits.service];
        serviceScore = serviceScore || 0;

        var userScore = Math.abs(mission.traits.hours - users[i].traits.hours) * -1 + industryScore + serviceScore;

        users[i].score = userScore;
      }
      users.sort(function(a, b) {
        if (a.score < b.score) {
          return 1;
        }
        if (a.score > b.score) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
      var found = false;
      for (var j = 0; !found && j < 3; j++) {
        if (users[j].traits){
          users[j].traits = {}
        }
        var alreadyMatched = false;
        if(!mission.matches){
          mission.matches = []
        }
        for(var k = 0; k < mission.matches.length; k++){
          if(users[j]._id == mission.matches[k].user){
            alreadyMatched = true;
          }
        }
        if(!alreadyMatched){
          //&& (users[j].traits.availableOn < mission.traits.availableOn && users[j].traits.availableOn)
          matchedUser = users[j];
          found = true;
          return res.json(200, matchedUser);
        }
      }
      if(!matchedUser){
        return res.send(404, 'No users matched.')
      }
    });
  })
};

// Request a user
exports.tagUser = function(req, res) {

  if(!req.body.mission || !req.body.user){
    return res.send(400)
  }

  console.log(req.body)

  var missionId = req.body.mission;
  var userId = req.body.user;
  var requested = req.body.requested;
  var missionUrl = process.env.DOMAIN + '/mission/' + missionId;

  Mission.findById(missionId, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }

    // Add user to requested
    var tagged = false;
    for (var i = 0; i < mission.matches.length; i++) {
      if (mission.matches[i].user == userId) {
        tagged = true;
      }
    }
    var notice;
    User.findById(userId, function(err, user) {

      if (!tagged) {
          var pushed = {
            user: userId
            , requested: requested
          }
          mission.matches.push(pushed)
          mission.save();
          console.log(mission)
        // Notify user
        notice = {
          to: user.email,
          from: 'IBM Beacon HQ <donotreply@heroes.ibmthinklab.com>',
          subject: 'IBM Beacon: You\'ve been requested!',
          html: 'Looks like someone is interested in bringing you onto their team! To accept or reject the mission, <a href=\"' + missionUrl + '\">click here</a>/<br><br>Cheers,<br>The IBM Beacon Team'
        };
      } else {
        notice = {
          to: user.email,
          from: 'IBM Beacon HQ <donotreply@heroes.ibmthinklab.com>',
          subject: 'IBM Beacon: You have a match!',
          html: 'Looks like someone is interested in bringing you onto their team! To accept or reject the mission, <a href=\"' + missionUrl + '\">click here</a>/<br><br>Cheers,<br>The IBM Beacon Team'
        };
      }

      mailgun.messages().send(notice, function(error, body) {
        if (error) {
          console.log(error)
        }
        return res.send(200)
      });
    })

  })

};



// User responds to a request
exports.tagMission = function(req, res) {
  var accepted = req.body.accepted;
  Mission.findById(req.params.id, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }
    var tagged = false;
    for (var i = 0; i < mission.matches.length; i++) {
      if (mission.matches[i].user == req.user._id) {
        if (mission.matches[i].accepted == accepted) {
          return res.send(401, 'User has already responded to this request')
        } else {
          mission.matches[i].accepted = accepted;
          mission.matches[i].responded = new Date();
          tagged = true;
        }
      }
      if (!tagged) {
        var pushed = {
          user: req.user._id,
          responded: new Date(),
          accepted: accepted
        }
        mission.matches.push(pushed)
      }
    }
  })
}


// Show a mission that user has not already tagged
exports.matchMission = function(req, res) {
};


// Requester chooses a user
exports.accept = function(req, res) {
};


// Requester cancels mission
exports.abort = function(req, res) {
  Mission.findById(req.params.id, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }

    var isOwner;
    if (req.user._id == mission.requester) {
      isOwner = true;
    }
    if (isOwner) {
      mission.status = 'Canceled'
      mission.open = false;
      mission.save()
      return res.json(200, request);
    } else {
      return res.json(401)
    }
  });
};



function handleError(res, err) {
  return res.send(500, err);
}
