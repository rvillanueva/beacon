'use strict';

angular.module('heroesApp')
  .controller('MissionsCtrl', function ($scope, requestFactory) {
    requestFactory.myRequests().then(function(data){
      console.log(data)
      $scope.missions = data;
    })
  });
