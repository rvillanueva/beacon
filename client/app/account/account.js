'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl'
      })
      .when('/signup', {
        templateUrl: 'app/account/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .when('/settings', {
        templateUrl: 'app/account/settings/settings.html',
        controller: 'SettingsCtrl',
        authenticate: true
      })
      .when('/verify', {
        templateUrl: 'app/account/verify/verify.html',
        controller: 'VerifyCtrl',
        authenticate: true,
        reloadOnSearch: false
      })
      .when('/verify/email/:code', {
        templateUrl: 'app/account/verify/code/code.html',
        controller: 'VerifyCodeCtrl'
      });
  });
