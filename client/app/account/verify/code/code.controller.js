'use strict';

angular.module('heroesApp')
  .controller('VerifyCodeCtrl', function ($scope, $location, $http, $routeParams) {
    var code = $routeParams.code;
    $scope.error = false;

    $scope.verify = function(code) {
      var posted = {
        code: code
      }
      $http.post('/api/verify/email/code', posted).success(function(data){
        $location.path('/profile/me').search('tutorial', 'true')
      }).error(function(err){
        window.alert('Error: ' + err)
      });
    };

    if(code){
      $scope.verify(code);
    } else {
      $scope.error = true;
    }

  });
