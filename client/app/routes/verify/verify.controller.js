'use strict';

angular.module('heroesApp')
  .controller('VerifyCtrl', function ($scope, profileFactory,User) {
    User.get(function(user){
      $scope.sent = {
        phone: false,
        email: false
      }
    })

    $scope.sendEmail = function(){
      var posted = {
        email: $scope.verification.email
      }
      profileFactory.sendEmail(posted).then(function(){
        $scope.sent.email = true;
      })
    }
    $scope.sendPhone = function(){
      var phone = {
        country: '+1'
        , number: $scope.verification.phone
      }
      profileFactory.sendPhone(phone).then(function(){
        $scope.sent.phone = true;
      })
    }
    $scope.verifyPhone = function(){
      profileFactory.verifyPhone($scope.phoneCode).then(function(data){
        console.log(data)
      })
    }
    $scope.new = function(type){
      if (type == 'phone'){
        $scope.sent.phone = false
      }
      if (type == 'email'){
        $scope.sent.email = false
      }
    }
  });
