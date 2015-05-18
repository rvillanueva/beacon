'use strict';

angular.module('heroesApp')
  .controller('RequestCtrl', function ($scope, requestFactory) {
    $scope.message = 'Hello';

    $scope.request = {
      desc: ""
    }

    $scope.makeRequest = function(){
      requestFactory.request().then(function(data){
        console.log(data)
      })
    }
  });
