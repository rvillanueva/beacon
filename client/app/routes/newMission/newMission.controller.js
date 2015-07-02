'use strict';

angular.module('heroesApp')
  .controller('NewMissionCtrl', function ($scope, $location, requestFactory) {
    $scope.request = {
      description: ''
      , traits: {
        hours: 1
      }
    }

    $scope.makeRequest = function(){
      requestFactory.newMission($scope.request).then(function(mission){
        console.log(mission)
        $location.path('/missions/view/' + mission._id)
      })
    }
  });
