'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/requests/new', {
        templateUrl: 'app/routes/request/request.html',
        controller: 'RequestCtrl'
      });
  });
