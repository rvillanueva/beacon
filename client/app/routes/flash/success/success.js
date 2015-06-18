'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/requests/new/success', {
        templateUrl: 'app/routes/flash/success/success.html',
        controller: 'FlashSuccessCtrl'
      });
  });
