'use strict';

angular.module('heroesApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/admin/questions', {
        templateUrl: 'app/admin/questions/questions.html',
        controller: 'AdminQuestionsCtrl'
      });
  });
