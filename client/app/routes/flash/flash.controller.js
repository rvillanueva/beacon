'use strict';

angular.module('heroesApp')
  .controller('FlashCtrl', function ($scope, $location, requestFactory) {
    $scope.request = {
      description: ''
      , traits: {
        hours: 1
      }
    }

    $scope.makeRequest = function(){
      requestFactory.request($scope.request).then(function(data){
        console.log(data)
        $location.path('/requests/new/success')
      })
    }
  });
