'use strict';

angular.module('heroesApp')
  .controller('MissionCtrl', function ($scope, User, $routeParams, $modal, requestFactory, traitFactory) {
    $scope.missionId = $routeParams.id
    var self = User.get();
    $scope.matches = []
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
          $scope.matches.push(match.accepted)
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

    $scope.viewMatches = function(){
        var modalInstance = $modal.open({
         templateUrl: '../components/modals/userMatches/userMatches.html',
         controller: 'UserMatchesModalCtrl',
         size: 'md',
         backdrop: true,
         resolve: {
           Mission: function(){
             return $scope.missionId
           }
         }
        });

        modalInstance.result.then(function (data) {
        })

      }

    $scope.accept = function(){
      requestFactory.accept(reqId).then(function(){

      })
    }

    $scope.industryKey = traitFactory.industryKey()
    $scope.serviceKey = traitFactory.serviceKey()

  });
