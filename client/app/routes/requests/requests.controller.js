'use strict';

angular.module('heroesApp')
  .controller('RequestsCtrl', function ($scope, requestFactory) {
    requestFactory.myRequests().then(function(data){
      $scope.requests = data;
    })
  });
