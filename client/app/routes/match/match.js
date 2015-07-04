'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match/', {
        templateUrl: 'app/routes/match/match.html',
        controller: 'MatchToMissionsCtrl'
      });
  });
