'use strict';

angular.module('heroesApp')
  .controller('MainCtrl', function ($scope, $http, Auth, User) {

  // Use the User $resource to fetch all users
  $scope.users = User.query().sort({ hours: -1});

  $scope.availability = 'Available';
  $scope.searchedTag = null;

  });
