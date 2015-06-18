'use strict';

angular.module('heroesApp')
  .controller('RequestCtrl', function ($scope, $routeParams, requestFactory) {
    var reqId = $routeParams.id

      requestFactory.getRequest(reqId).then(function(data){
        console.log(data)
        $scope.request = data;
      })
  });
