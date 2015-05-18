'use strict';

angular.module('heroesApp')
  .controller('VerifyCtrl', function ($scope, profileFactory) {
    $scope.verification = {
      phone: null
    }
    $scope.verify = function(){
      profileFactory.verifyPhone($scope.verification).then(function(){
        $scope.sent = true;
      })
    }
  });
