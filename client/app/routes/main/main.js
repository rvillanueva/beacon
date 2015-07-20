'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'app/routes/main/main.html',
        controller: 'MainCtrl'
      });
  });
