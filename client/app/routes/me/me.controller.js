'use strict';

angular.module('heroesApp')
  .controller('MeCtrl', function ($scope, profileFactory, $location) {

    profileFactory.me().then(function(data){
      $scope.profile = data;
    })
    $scope.save = function(){
      profileFactory.saveProfile($scope.profile).then(function(data){
        $location.path('/')
      })

    }
  });
