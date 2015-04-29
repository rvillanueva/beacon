'use strict';

angular.module('heroesApp')
  .controller('RequestCtrl', function ($scope) {
    $scope.message = 'Hello';

    $scope.request = {
      desc: ""
    }
  });
