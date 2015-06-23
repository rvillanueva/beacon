'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('requests/view/:id', {
        templateUrl: 'app/routes/request/request.html',
        controller: 'RequestCtrl'
      });
  });
