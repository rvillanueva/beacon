'use strict';

angular.module('heroesApp')
  .controller('UserMatchesModalCtrl', function ($scope, requestFactory, userFactory, Mission) {
    console.log(Mission)
    $scope.matches = []
    requestFactory.getRequest(Mission).then(function(missionData){
      $scope.mission = missionData;
      angular.forEach($scope.mission.matches, function(match, index){
        if(match.missionWants || match.userWants){
          userFactory.getUser(match.user).then(function(user){
            var pushed = match;
            pushed.user = user;
            $scope.matches.push(pushed);
          })
        }
      })
    })

  });
