'use strict';

angular.module('heroesApp')
  .controller('VerifyEmailCtrl', function ($scope, $location, $http, $routeParams) {
    var code = $routeParams.code;
    $http.get('/api/verify/email/' + code).success(function(data){
      $location.path('/verify');
    }).err(function(err){
      $scope.message = 'That doesn\'t seem like the right code... maybe check your email again?';
    })

  });
