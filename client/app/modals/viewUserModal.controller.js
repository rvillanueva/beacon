'use strict';

angular.module('heroesApp')
  .controller('UserViewModalCtrl', function ($scope, $modalInstance, requestFactory, userFactory, User, Mission) {
    $scope.user = User;
    $scope.mission = Mission;
    $scope.tag = function(requested){
      var params = {
        mission: $scope.mission._id
        , user: $scope.user._id
        , requested: requested
      }
      requestFactory.tagUser(params).then(function(isMatched){
        if(isMatched){

        } else {

        }
      })
      $modalInstance.dismiss($scope.user._id, requested);
    }
  });
