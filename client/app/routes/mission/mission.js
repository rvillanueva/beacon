'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/missions/view/:id', {
        templateUrl: 'app/routes/mission/mission.html',
        controller: 'MissionCtrl'
      });
  });
