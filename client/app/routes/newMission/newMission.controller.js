'use strict';

angular.module('heroesApp')
  .controller('NewMissionCtrl', function ($scope, $location, requestFactory, traitFactory) {
    $scope.request = {
      description: ''
      , traits: {
        hours: "1"
      }
    }
    $scope.hoursOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    $scope.industries = traitFactory.industryKey();
    $scope.services = traitFactory.serviceKey();


    $scope.makeRequest = function(){
      requestFactory.newMission($scope.request).then(function(mission){
        console.log(mission)
        $location.path('/missions/view/' + mission._id)
      })
    }
  });
