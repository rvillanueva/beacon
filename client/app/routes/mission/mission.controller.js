'use strict';

angular.module('heroesApp')
  .controller('MissionCtrl', function ($scope, User, $routeParams, requestFactory) {
    $scope.missionId = $routeParams.id
    var self = User.get();
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
    })

    $scope.accept = function(){
      requestFactory.accept(reqId).then(function(){

      })
    }

  });
