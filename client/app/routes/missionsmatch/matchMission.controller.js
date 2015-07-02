'use strict';

angular.module('heroesApp')
  .controller('MatchMissionCtrl', function ($scope, requestFactory) {
    $scope.match = {
      name: 'Clark Kent',
      score: 76,
      title: 'Experience Designer',
      pictureUrl: 'https://media.licdn.com/mpr/mprx/0_rVO-LKrBUEXpGFUqYy0DL-lsR7rlh3oq-ZoSL1KLXuXT05jNypaOwPXIzFKm_6I4AJp2oNaSF7uF'
    };

    requestFactory.findUser($scope.missionId).then(function(match){
      console.log(match)
      $scope.match = match;
    })
  });
