'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/missions/new', {
        templateUrl: 'app/routes/newMission/newMission.html',
        controller: 'NewMissionCtrl'
      });
  });
