'use strict';

angular.module('heroesApp')
  .controller('ProfileCtrl', function ($scope, profileFactory, $location, $routeParams) {
    $scope.coverClass = 'visit-generic'

    $scope.editing = {
      details: false,
      seeking: false,
      about: false
    }

    $scope.fields = {
      details: {
        title: ''
      },
      seeking: '',
      about: ''
    }

    $scope.edit = function(field){
      $scope.editing[field] = true;
      if(field == 'details'){

      } else {
        $scope.fields[field] = $scope.profile[field];
      }
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
    $scope.save = function(field){
      if('details'){
        $scope.profile.
      }
      profileFactory.saveProfile($scope.profile).then(function(data){
        $location.path('/')
      })
    }
  });
