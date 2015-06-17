'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/requests', {
        templateUrl: 'app/routes/requests/requests.html',
        controller: 'RequestsCtrl'
      });
  });
