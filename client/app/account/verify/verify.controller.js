'use strict';

angular.module('heroesApp')
  .controller('VerifyCtrl', function ($scope, $http) {
    $scope.send = function(event) {
      var posted = {
        email: $scope.email
      }
      $scope.success = false;
      $http.post('/api/verify/email', posted).success(function(data){
        $scope.success = true;
      }).error(function(err){
        window.alert('Error: ' + err)
      });
      event.preventDefault();
      event.stopPropagation();
    };

  });
