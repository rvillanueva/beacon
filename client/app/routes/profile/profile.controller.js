'use strict';

angular.module('heroesApp')
  .controller('ProfileCtrl', function ($scope, profileFactory, $location, $routeParams) {
    $scope.coverClass = 'visit-generic'

    $scope.editing = {
      details: false,
      seeking: false,
      about: false
    }

    $scope.edit = function(field){
      $scope.editing[field] = true
    }

    if($routeParams.id){
      profileFactory.get($routeParams.id).then(function(profile){
        $scope.profile = profile;
        //Need to check if owner
      })
    } else {
      profileFactory.me().then(function(me){
        $scope.profile = me;
        $scope.isMe = true;
      })
    }
    $scope.save = function(){
      profileFactory.saveProfile($scope.profile).then(function(data){
        $location.path('/')
      })

    }
  });
