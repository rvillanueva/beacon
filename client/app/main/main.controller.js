'use strict';

angular.module('heroesApp')
  .controller('MainCtrl', function ($scope, $http, Auth, User) {

  // Use the User $resource to fetch all users
  $scope.users = User.query();

  });
