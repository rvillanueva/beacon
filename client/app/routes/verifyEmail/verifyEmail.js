'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/verify/phone/:code', {
        templateUrl: 'app/routes/verifyPhone/verifyPhone.html',
        controller: 'VerifyPhoneCtrl'
      });
  });
