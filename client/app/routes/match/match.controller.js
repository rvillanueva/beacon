'use strict';

angular.module('heroesApp')
  .controller('MatchToMissionsCtrl', function ($scope) {
    $scope.mission = {
      title: 'Stop the Joker',
      score: 76,
      description: 'You must stop the Joker.'
    };
  });
