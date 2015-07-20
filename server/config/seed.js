/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var User = require('../api/user/user.model');
var Mission = require('../api/mission/mission.model');

Mission.find({}).remove(function(){
  Mission.create({
    requester: 'test',
    title: 'Unite the Avengers',
    description: 'The Avengers are separated. You must unite them.',
    open: true,
    matches: [],
    responders: [],
    times: { submitted: 'Thu Jul 02 2015 21:56:10 GMT-0400 (EDT)' },
    traits: {
      hours: 5,
      industry: "aerospace",
      service: "ams"
    }
  })
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test',
    traits: {
      industry:{},
      service:{},
      hours: 10
    }
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    traits: {
      industry:{},
      service:{},
      hours: 10
    }
  }, function() {
      console.log('finished populating users');
    }
  );
});
