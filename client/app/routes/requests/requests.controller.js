'use strict';

angular.module('heroesApp')
  .controller('RequestsCtrl', function ($scope, requestFactory) {
    requestFactory.myRequests().then(function(data){
      console.log(data)
      $scope.requests = data;
    })
  });
