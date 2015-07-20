'use strict';

angular.module('heroesApp')
  .controller('MatchToHeroesCtrl', function ($scope, requestFactory) {


    requestFactory.matchUser($scope.missionId).then(function(match){
      $scope.noMatches = false;
      $scope.match = match;
    }).catch(function(err) {
      console.log(err)
      $scope.noMatches = true;
    })

    $scope.tag = function(requested){
      var params = {
        mission: $scope.missionId
        , user: $scope.match._id
        , requested: requested
      }
      requestFactory.tagUser(params).then(function(isMatched){
        if(isMatched){

        } else {
          requestFactory.matchUser($scope.missionId).then(function(newMatch){
            $scope.noMatches = false;
            $scope.match = newMatch;
          }).catch(function(err) {
            $scope.noMatches = true;
          })
        }
      })
    }


    //$scope.match = {
      //name: 'Clark Kent',
      //score: 76,
      //title: 'Experience Designer',
      //pictureUrl: 'https://media.licdn.com/mpr/mprx/0_rVO-LKrBUEXpGFUqYy0DL-lsR7rlh3oq-ZoSL1KLXuXT05jNypaOwPXIzFKm_6I4AJp2oNaSF7uF'
    //};

  });
