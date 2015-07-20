'use strict';

angular.module('heroesApp')
  .controller('MissionCtrl', function ($scope, User, $routeParams, requestFactory, traitFactory) {
    $scope.missionId = $routeParams.id
    var self = User.get();
    $scope.accepted = []
    requestFactory.getRequest($scope.missionId).then(function(data){
      console.log(data)
      $scope.mission = data;
      if($scope.mission.requester == self._id){
        $scope.owner = true;
      } else {
        angular.forEach($scope.mission.requested, function(requested, index){
          if(requested.user == self._id){
            $scope.responder = true;
          }
        })
      }
      angular.forEach($scope.mission.matches, function(match, index){
        if(match.accepted){
          $scope.accepted.push(match.accepted)
        }
      })
    })

    $scope.abort = function(id){
      var confirm = window.confirm("Are you sure you want to abort this mission? All your matches will be lost.");
      if (confirm) {
        requestFactory.abortMission($scope.mission._id).then(function(data){
          $scope.mission = data;
          console.log(data)
        }, function(err){
          if(err){
            console.log(err)
          }
        })
      }
    }

    $scope.accept = function(){
      requestFactory.accept(reqId).then(function(){

      })
    }

    $scope.industryKey = traitFactory.industryKey()
    $scope.serviceKey = traitFactory.serviceKey()

  });
