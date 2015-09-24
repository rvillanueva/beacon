'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile/view/:id', {
        templateUrl: 'app/routes/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/profile/me', {
        templateUrl: 'app/routes/profile/profile.html',
        controller: 'ProfileCtrl'
      });
  });
