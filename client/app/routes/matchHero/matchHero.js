'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/match/hero/:id', {
        templateUrl: 'app/routes/matchHero/matchHero.html',
        controller: 'MatchHeroCtrl'
      });
  });
