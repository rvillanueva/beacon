'use strict';

angular.module('heroesApp')
  .factory('profileFactory', function ($q, $http) {
    // Service logic
    // ...

    var me = function(){
      var deferred = $q.defer();
      $http.get('/api/users/me').success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var saveProfile = function(profile){
      var deferred = $q.defer();
      $http.patch('/api/users/me', profile).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var verifyPhone = function(phone){
      var deferred = $q.defer();
      $http.post('/api/users/verify/phone', phone).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    // Public API here
    return {
      me: function () {
        var deferred = $q.defer()
        me().then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      saveProfile: function (profile) {
        var deferred = $q.defer()
        saveProfile(profile).then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      verifyPhone: function (phone) {
        var deferred = $q.defer()
        verifyPhone(phone).then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      }

    };
  });
