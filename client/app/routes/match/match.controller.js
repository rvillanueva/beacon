'use strict';

angular.module('heroesApp')
  .controller('MatchToMissionsCtrl', function ($scope, requestFactory) {
    $scope.mission = {
      title: 'Stop the Joker',
      score: 76,
      description: 'You must stop the Joker.'
    };

    $scope.noMatches = true;

    requestFactory.matchMission().then(function(mission){
      $scope.noMatches = false;
      $scope.mission = mission;
    })

    $scope.tag = function(accepted){
      var params = {
        mission: $scope.mission._id
        , accepted: accepted
      }
      console.log(accepted)
      requestFactory.tagMission(params).then(function(){
        console.log(params)
        requestFactory.matchMission().then(function(newMatch){
          console.log(newMatch)
          $scope.noMatches = false;
          $scope.match = newMatch;
        }).catch(function(err) {
          $scope.noMatches = true;
        })
      })
    }
  });
