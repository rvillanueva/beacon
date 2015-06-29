'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/missions', {
        templateUrl: 'app/routes/missions/missions.html',
        controller: 'MissionsCtrl'
      });
  });
