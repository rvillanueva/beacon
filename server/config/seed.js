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
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin',
    traits: {
      industry:{},
      service:{},
      hours: 10
    },
      "provider": "linkedin",
      "linkedin": {
        "siteStandardProfileRequest": {
          "url": "https://www.linkedin.com/profile/view?id=66261525&authType=name&authToken=QlUQ&trk=api*a3743723*s3813123*"
        },
        "relationToViewer": {
          "distance": 0
        },
        "publicProfileUrl": "https://www.linkedin.com/in/ryanjvillanueva",
        "positions": {
          "values": [{
            "title": "Experience Designer, Research",
            "summary": "• Full stack Node.js & AngularJS developer for digital experience, rapid prototypes, and internal tools.\n• Train global labs on how to present research efforts in healthcare, materials design, consumer insight, cognitive, cloud, and more.\n• Organize and design client executive visits.",
            "startDate": {
              "year": 2014,
              "month": 8
            },
            "isCurrent": true,
            "id": 676389526,
            "company": {
              "type": "Public Company",
              "ticker": "IBM",
              "size": "10,001+ employees",
              "name": "IBM",
              "industry": "Information Technology and Services",
              "id": 1009
            }
          }],
          "_total": 1
        },
        "pictureUrl": "https://media.licdn.com/mpr/mprx/0_rVO-LKrBUEXpGFUqYy0DL-lsR7rlh3oq-ZoSL1KLXuXT05jNypaOwPXIzFKm_6I4AJp2oNaSF7uF",
        "numConnectionsCapped": true,
        "numConnections": 500,
        "location": {
          "name": "Greater New York City Area",
          "country": {
            "code": "us"
          }
        },
        "lastName": "Villanueva",
        "industry": "Research",
        "id": "kYnYdrOhUQ",
        "headline": "Experience Designer at IBM Research",
        "formattedName": "Ryan Villanueva",
        "firstName": "Ryan",
        "emailAddress": "ryanvill@gmail.com",
        "distance": 0,
        "currentShare": {
          "visibility": {
            "code": "anyone"
          },
          "timestamp": 1408735687000,
          "source": {
            "serviceProvider": {
              "name": "LINKEDIN"
            }
          },
          "content": {
            "title": "Avoiding the Unintended Consequences of Casual Feedback",
            "thumbnailUrl": "https://media.licdn.com/media-proxy/ext?w=80&h=100&f=&hash=mJo9dtxb%2FQVxSNSOzfHFJ%2BVK1YU%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6nlh8Tw1It6a2FowGz60oISJLOTW3hGTrq5dCfYHfsZsfZfK2j9VgJeypQwwMxKvHyAGc",
            "submittedUrl": "https://www.linkedin.com/today/post/article/20140602024642-22330283-avoiding-the-unintended-consequences-of-casual-feedback?trk=api*a3743723*s3813123*",
            "submittedImageUrl": "https://media.licdn.com/mpr/mpr/p/5/005/065/2a5/36ac73e.jpg",
            "shortenedUrl": "http://lnkd.in/bf7mB67",
            "resolvedUrl": "https://www.linkedin.com/today/post/article/20140602024642-22330283-avoiding-the-unintended-consequences-of-casual-feedback",
            "eyebrowUrl": "https://www.linkedin.com/today/post/article/20140602024642-22330283-avoiding-the-unintended-consequences-of-casual-feedback",
            "description": "Avoiding the Unintended Consequences of Casual Feedback"
          },
          "author": {
            "lastName": "Villanueva",
            "id": "kYnYdrOhUQ",
            "firstName": "Ryan"
          }
        },
        "apiStandardProfileRequest": {
          "url": "https://api.linkedin.com/v1/people/kYnYdrOhUQ",
          "headers": {
            "values": [{
              "value": "name:QlUQ",
              "name": "x-li-auth-token"
            }],
            "_total": 1
          }
        }
      },
      "title": "Experience Designer at IBM Research",
      "pictureUrl": "https://media.licdn.com/mpr/mprx/0_rVO-LKrBUEXpGFUqYy0DL-lsR7rlh3oq-ZoSL1KLXuXT05jNypaOwPXIzFKm_6I4AJp2oNaSF7uF",
  },
  {
    "name": "Ryan Villanueva",
    "provider": "linkedin",
    "linkedin": {
      "siteStandardProfileRequest": {
        "url": "https://www.linkedin.com/profile/view?id=66261525&authType=name&authToken=QlUQ&trk=api*a3743723*s3813123*"
      },
      "relationToViewer": {
        "distance": 0
      },
      "publicProfileUrl": "https://www.linkedin.com/in/ryanjvillanueva",
      "positions": {
        "values": [{
          "title": "Experience Designer, Research",
          "summary": "• Full stack Node.js & AngularJS developer for digital experience, rapid prototypes, and internal tools.\n• Train global labs on how to present research efforts in healthcare, materials design, consumer insight, cognitive, cloud, and more.\n• Organize and design client executive visits.",
          "startDate": {
            "year": 2014,
            "month": 8
          },
          "isCurrent": true,
          "id": 676389526,
          "company": {
            "type": "Public Company",
            "ticker": "IBM",
            "size": "10,001+ employees",
            "name": "IBM",
            "industry": "Information Technology and Services",
            "id": 1009
          }
        }],
        "_total": 1
      },
      "pictureUrl": "https://media.licdn.com/mpr/mprx/0_rVO-LKrBUEXpGFUqYy0DL-lsR7rlh3oq-ZoSL1KLXuXT05jNypaOwPXIzFKm_6I4AJp2oNaSF7uF",
      "numConnectionsCapped": true,
      "numConnections": 500,
      "location": {
        "name": "Greater New York City Area",
        "country": {
          "code": "us"
        }
      },
      "lastName": "Villanueva",
      "industry": "Research",
      "id": "kYnYdrOhUQ",
      "headline": "Experience Designer at IBM Research",
      "formattedName": "Ryan Villanueva",
      "firstName": "Ryan",
      "emailAddress": "ryanvill@gmail.com",
      "distance": 0,
      "currentShare": {
        "visibility": {
          "code": "anyone"
        },
        "timestamp": 1408735687000,
        "source": {
          "serviceProvider": {
            "name": "LINKEDIN"
          }
        },
        "id": "s5908665729611218944",
        "content": {
          "title": "Avoiding the Unintended Consequences of Casual Feedback",
          "thumbnailUrl": "https://media.licdn.com/media-proxy/ext?w=80&h=100&f=&hash=mJo9dtxb%2FQVxSNSOzfHFJ%2BVK1YU%3D&ora=1%2CaFBCTXdkRmpGL2lvQUFBPQ%2CxAVta5g-0R6nlh8Tw1It6a2FowGz60oISJLOTW3hGTrq5dCfYHfsZsfZfK2j9VgJeypQwwMxKvHyAGc",
          "submittedUrl": "https://www.linkedin.com/today/post/article/20140602024642-22330283-avoiding-the-unintended-consequences-of-casual-feedback?trk=api*a3743723*s3813123*",
          "submittedImageUrl": "https://media.licdn.com/mpr/mpr/p/5/005/065/2a5/36ac73e.jpg",
          "shortenedUrl": "http://lnkd.in/bf7mB67",
          "resolvedUrl": "https://www.linkedin.com/today/post/article/20140602024642-22330283-avoiding-the-unintended-consequences-of-casual-feedback",
          "eyebrowUrl": "https://www.linkedin.com/today/post/article/20140602024642-22330283-avoiding-the-unintended-consequences-of-casual-feedback",
          "description": "Avoiding the Unintended Consequences of Casual Feedback"
        },
        "author": {
          "lastName": "Villanueva",
          "id": "kYnYdrOhUQ",
          "firstName": "Ryan"
        }
      },
      "apiStandardProfileRequest": {
        "url": "https://api.linkedin.com/v1/people/kYnYdrOhUQ",
        "headers": {
          "values": [{
            "value": "name:QlUQ",
            "name": "x-li-auth-token"
          }],
          "_total": 1
        }
      }
    },
    "title": "Experience Designer at IBM Research",
    "pictureUrl": "https://media.licdn.com/mpr/mprx/0_rVO-LKrBUEXpGFUqYy0DL-lsR7rlh3oq-ZoSL1KLXuXT05jNypaOwPXIzFKm_6I4AJp2oNaSF7uF"
  },
  function() {
      console.log('finished populating users');
    }
  );
});
