'use strict';

angular.module('heroesApp')
  .controller('RequestCtrl', function ($scope, requestFactory) {
    $scope.message = 'Hello';

    $scope.makeRequest = function(){
      requestFactory.request($scope.request).then(function(data){
        console.log(data)
      })
    }
  });
