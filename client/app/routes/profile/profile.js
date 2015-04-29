'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hero/:id', {
        templateUrl: 'app/routes/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });
