'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/me', {
        templateUrl: 'app/routes/me/me.html',
        controller: 'MeCtrl'
      });
  });
