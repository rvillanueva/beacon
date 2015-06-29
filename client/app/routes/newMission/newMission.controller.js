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
      requestFactory.request($scope.request).then(function(data){
        console.log(data)
        $location.path('/missions/new/success')
      })
    }
  });
