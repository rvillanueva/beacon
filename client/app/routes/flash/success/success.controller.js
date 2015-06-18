'use strict';

angular.module('heroesApp')
  .controller('FlashSuccessCtrl', function ($scope) {
    $scope.confirmations = [
      "Superb!", "Justice League unite!", "Quack... quack... quack quack QUACK! Gooooo Wild Ducks!", "Stupendous!","By our powers combined, I am Captain Planet!"
    ]

    $scope.message = $scope.confirmations[Math.floor(Math.random()*$scope.confirmations.length)]
  });
