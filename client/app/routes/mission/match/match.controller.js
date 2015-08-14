'use strict';

angular.module('heroesApp')
  .controller('MatchToHeroesCtrl', function ($scope, requestFactory, $modal) {

    $scope.getUsers = function(){
      requestFactory.returnUsers($scope.missionId).then(function(users){
        $scope.noUsers = false;
        $scope.users = users;
        angular.forEach($scope.users, function(user, index){
          if (typeof $scope.taggedIndex[user._id] !== 'undefined'){
            user.match = $scope.taggedIndex[user._id];
            delete user.match.user;
          }
        })
        console.log($scope.users)
      }).catch(function(err) {
        console.log(err)
        $scope.noUsers = true;
      })
    }

    $scope.getUsers();

    $scope.open = function(user){
      var modalInstance = $modal.open({
       templateUrl: '../components/modals/viewUser/viewUser.html',
       controller: 'UserViewModalCtrl',
       size: 'md',
       backdrop: true,
       resolve: {
         User: function(){
           return user;
         },
         Mission: function(){
           return $scope.mission;
         }
       }
      });

      modalInstance.result.then(function (data) {
        $scope.getUsers();
      })

    }
  });
