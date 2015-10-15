'use strict';

angular.module('heroesApp')
  .controller('ProfileCtrl', function ($scope, User, profileFactory, $location, $routeParams, $timeout) {
    $scope.coverClass = 'visit-generic'
    $scope.newTag = '';

    if($routeParams.tutorial){
      $scope.tutorial = true;
      $timeout(function(){
        $('body').chardinJs('start')
      }, 1000)
    } else {
      $scope.tutorial = false;
    }


    console.log($scope.tutorial)

    $scope.checkOwner = function(){
      User.get(function(me){
        if($scope.profile._id == me._id){
          $scope.isOwner = true;
        } else {
          $scope.isOwner = false;
        }
      })
    }

    if($routeParams.id){
      profileFactory.get($routeParams.id).then(function(profile){
        $scope.profile = profile;
        $scope.checkOwner();
      })
    } else {
      profileFactory.me().then(function(me){
        $scope.profile = me;
        $scope.checkOwner();
      })
    }


    $scope.addTag = function(event){
      if($scope.newTag.length > 0){
        var pushed = {
          tag: $scope.newTag
        }
        if(!$scope.profile.traits){
          $scope.profile.traits = {}
        }
        if(!$scope.profile.traits.tags){
          $scope.profile.traits.tags = []
        }
        $scope.profile.traits.tags.push(pushed);
        $scope.newTag = '';
      }
      $scope.save();
      event.preventDefault;
      event.stopPropagation;
    }

    $scope.removeTag = function(index){
      $scope.profile.traits.tags.splice(index, 1);
      $scope.save();
    }

    $scope.updateAvailability = function(status){
      $scope.profile.traits.availability = status;
      $scope.save();
    }

    $scope.save = function(){
      profileFactory.saveProfile($scope.profile).then(function(data){
        console.log('Saved!')
      })
    }
  });
