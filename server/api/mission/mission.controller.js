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
var Service = require('./mission.service');

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
    status: 'Open',
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
exports.pairUser = function(req, res) {
  Mission.findById(req.params.id, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }
    if(!(mission.requester == req.user._id)){
      return res.send(401);
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
        users[i].score = Service.score(mission, users[i])
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
      for (var j = 0; !found && j < users.length; j++) {
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
        if(!alreadyMatched && !(mission.requester == users[j]._id)){
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

// Show relevant users
exports.returnUsers = function(req, res) {
  Mission.findById(req.params.id, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }
    if(!(mission.requester == req.user._id)){
      return res.send(401);
    }

    var skipped = 0;

    User.find('-hashedPassword -salt').lean().exec(function(err, foundUsers) {
      var users = foundUsers;
      var returnedUsers = [];
      if (err) {
        return handleError(res, err);
      }
      var matchedUser;
      for (var i = 0; i < users.length; i++) {
        // score based on hours needed
        // score based on industry and service area
        // score based on number of requests tagged
        users[i].score = Service.score(mission, users[i])
      }
      // Sort based on score
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
      for (var j = 0; !found && j < users.length; j++) {
        if (users[j].traits){
          users[j].traits = {}
        }
        returnedUsers.push(users[j])
      }
      return res.json(200, returnedUsers);

      if(returnedUsers.length == 0){
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
  var requested = req.body.missionWants;
  var missionUrl = process.env.DOMAIN + '/mission/' + missionId;

  Mission.findById(missionId, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }

    // Add user to missionWants
    var taggedNum = false;
    for (var i = 0; i < mission.matches.length; i++) {
      if (mission.matches[i].user == userId) {
        taggedNum = i;
      }
    }
    var notice;
    User.findById(userId, function(err, user) {

      if (!taggedNum) {
          var pushed = {
            user: userId
            , missionWants: requested
          }
          mission.matches.push(pushed)
      } else {
        mission.matches[taggedNum].missionWants = requested;
      }
      mission.save(function(saved){
        console.log(saved)
        return res.send(200, requested)
      });



    })

  })

};



// User responds to a request
exports.tagMission = function(req, res) {
  var userWants = req.body.userWants;
  Mission.findById(req.body.mission, function(err, mission) {
    if (err) {
      return handleError(res, err);
    }
    if (!mission) {
      return res.send(404);
    }
    var tagged = false;
    for (var i = 0; i < mission.matches.length; i++) {
      if (mission.matches[i].user == req.user._id) {
        if (mission.matches[i].userWants == userWants) {
          return res.send(404, 'User has already responded to this request')
        } else {
          tagged = true;
          mission.matches[i].userWants = userWants;
          mission.matches[i].responded = new Date();
        }
      }
    }
    if (!tagged) {
      var pushed = {
        user: req.user._id,
        responded: new Date(),
        userWants: userWants
      }
      mission.matches.push(pushed)
    }
    mission.save(function(){
      return res.send(200)
    }, function(err){
      return res.send(500)
    })
  })
}


// Show a mission that user has not already tagged
exports.returnMissions = function(req, res) {
  console.log(req.user._id)
  User.findById(req.user._id, '-hashedPassword -salt').lean().exec(function(err, user){
    var returnedMissions = []
    Mission.find().lean().exec(function(err, foundMissions) {
      var missions = foundMissions;
      console.log(missions)
      if (err) {
        return handleError(res, err);
      }

      for (var i = 0; i < missions.length; i++) {
        missions[i].score = Service.score(user, missions[i]);
      }
      missions.sort(function(a, b) {
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
      for (var j = 0; !found && j < missions.length; j++) {
        if (!missions[j].traits){
          missions[j].traits = {}
        }
        var alreadyMatched = false;
        if(!missions[j].matches){
          missions[j].matches = []
        }
        for(var k = 0; k < missions[j].matches.length; k++){
          if(req.user._id == missions[j].matches[k].user){
            alreadyMatched = true;
          }
        }
        if(!(missions[j].requester == req.user._id)){
          returnedMissions.push(missions[j])
        }
      }
      if(returnedMissions.length == 0){
        return res.send(404, 'No missions matched.')
      }
      return res.json(200, returnedMissions);

    });
  })
};


// Requester chooses a user
exports.accept = function(req, res) {
  return res.send(200)
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
      mission.status = 'Canceled';
      mission.open = false;
      mission.save(function(err, saved){
        return res.json(200, saved);
      })
    } else {
      return res.json(401)
    }
  });
};



function handleError(res, err) {
  return res.send(500, err);
}
