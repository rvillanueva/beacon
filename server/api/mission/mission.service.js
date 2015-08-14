'use strict';

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
exports.score = score;
