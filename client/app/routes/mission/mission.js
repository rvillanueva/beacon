'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mission/:id', {
        templateUrl: 'app/routes/mission/mission.html',
        controller: 'MissionCtrl'
      });
  });
