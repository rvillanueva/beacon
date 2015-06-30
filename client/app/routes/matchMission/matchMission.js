'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/mission/:id/match', {
        templateUrl: 'app/routes/matchMission/matchMission.html',
        controller: 'MatchMissionCtrl'
      });
  });
