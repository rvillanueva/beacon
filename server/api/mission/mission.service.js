'use strict';

var mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_SECRET,
  domain: process.env.MAILGUN_URL
});


/**
 *
 */
function score(user, mission){

  if(!mission.traits){
    mission.traits = {}
  }
  if(!mission.traits.hours){
    mission.traits.hours = 0;
  }
  if(!user.traits){
    user.traits = {}
  }
  if(!user.traits.hours){
    user.traits.hours = 0;
  }
  if(!user.traits.industry){
    user.traits.industry = {}
  }
  if(!user.traits.service){
    user.traits.service = {}
  }
  // In case specific industry or service are undefined
  var industryScore = user.traits.industry[mission.traits.industry];
  industryScore = industryScore || 0;
  var serviceScore = user.traits.service[mission.traits.service];
  serviceScore = serviceScore || 0;

  var hoursScore = 10;
  if (user.traits.hours < mission.traits.hours){
    hoursScore -= (mission.traits.hours - user.traits.hours);
  }

  var maxPossible = 30;
  var matchScore = hoursScore + industryScore * 10 + serviceScore * 10;
  var finalScore = Math.floor(matchScore/maxPossible*100);
  return finalScore;
}

function notify(user, type){
  var notice;
  if (type == 'userRequested'){
    notice = {
      to: user.email,
      from: 'IBM Beacon HQ <donotreply@beacon.ibmthinklab.com>',
      subject: 'IBM Beacon: You\'ve been requested!',
      html: 'Looks like someone is interested in bringing you onto their team! To accept or reject the mission, <a href=\"' + missionUrl + '\">click here</a>/<br><br>Cheers,<br>The IBM Beacon Team'
    };
  } else if (type == "userMatched"){
    notice = {
      to: user.email,
      from: 'IBM Beacon HQ <donotreply@beacon.ibmthinklab.com>',
      subject: 'IBM Beacon: You have a match!',
      html: 'You\'ve found a match! To accept or reject the mission, <a href=\"' + missionUrl + '\">click here</a>/<br><br>Cheers,<br>The IBM Beacon Team'
    };
  }

  mailgun.messages().send(notice, function(error, body) {
    if (error) {
      console.log(error)
    }
  });


}
exports.score = score;
