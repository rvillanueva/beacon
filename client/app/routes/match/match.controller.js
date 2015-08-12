'use strict';

angular.module('heroesApp')
  .controller('MatchToMissionsCtrl', function ($scope, requestFactory, traitFactory) {
    $scope.mission = {
      title: '',
      score: 76,
      description: ''
    };

    $scope.noMatches = true;

    requestFactory.returnMissions().then(function(missions){
      $scope.noMatches = false;
      $scope.missions = missions;
      console.log(missions)
    })

    $scope.industryKey = traitFactory.industryKey()
    $scope.serviceKey = traitFactory.serviceKey()

    $scope.tag = function(missionId, accepted){
      var params = {
        mission: missionId
        , accepted: accepted
      }
      console.log(accepted)
      requestFactory.tagMission(params).then(function(){
        console.log(params)
        requestFactory.returnMissions().then(function(newMatch){
          console.log(newMatch)
          $scope.noMatches = false;
          $scope.match = newMatch;
        }).catch(function(err) {
          $scope.noMatches = true;
        })
      })
    }
  });
