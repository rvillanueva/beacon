'use strict';

angular.module('heroesApp')
  .controller('MissionCtrl', function ($scope, User, $routeParams, requestFactory) {
    $scope.missionId = $routeParams.id
    var self = User.get();
    $scope.accepted = []
    requestFactory.getRequest($scope.missionId).then(function(data){
      console.log(data)
      $scope.request = data;
      if($scope.request.requester == self._id){
        $scope.owner = true;
      } else {
        angular.forEach($scope.request.requested, function(requested, index){
          if(requested.user == self._id){
            $scope.responder = true;
          }
        })
      }
      angular.forEach($scope.request.matches, function(match, index){
        if(match.accepted){
          $scope.accepted.push(match.accepted)
        }
      })
    })

    $scope.accept = function(){
      requestFactory.accept(reqId).then(function(){

      })
    }

  });
