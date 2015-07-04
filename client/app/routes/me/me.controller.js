'use strict';

angular.module('heroesApp')
  .controller('MeCtrl', function ($scope, profileFactory, $location) {

    profileFactory.me().then(function(data){
      $scope.profile = data;
      if($scope.profile.traits){
        if (!$scope.profile.traits.hours){
          $scope.profile.traits.hours = 0
        }
        $scope.profile.traits.hours = $scope.profile.traits.hours.toString();
      }
    })
    $scope.save = function(){
      profileFactory.saveProfile($scope.profile).then(function(data){
        $location.path('/')
      })

    }
  });
