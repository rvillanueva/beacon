'use strict';

angular.module('heroesApp')
  .controller('UserMatchesModalCtrl', function ($scope, requestFactory, Mission) {
    console.log(Mission)
    requestFactory.getRequest(Mission).then(function(missionData){
      $scope.mission = missionData;
    })
  });
