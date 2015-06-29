'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match/mission', {
        templateUrl: 'app/routes/matchMission/matchMission.html',
        controller: 'MatchMissionCtrl'
      });
  });
