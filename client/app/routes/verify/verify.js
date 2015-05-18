'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/verify', {
        templateUrl: 'app/routes/verify/verify.html',
        controller: 'VerifyCtrl'
      });
  });
