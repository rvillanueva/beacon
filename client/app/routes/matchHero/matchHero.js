'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match/', {
        templateUrl: 'app/routes/matchHero/matchHero.html',
        controller: 'MatchHeroCtrl'
      });
  });
