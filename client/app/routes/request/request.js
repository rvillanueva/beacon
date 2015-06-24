'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/request/:id', {
        templateUrl: 'app/routes/request/request.html',
        controller: 'RequestCtrl'
      });
  });
