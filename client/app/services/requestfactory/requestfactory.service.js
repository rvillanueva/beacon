'use strict';

angular.module('heroesApp')
  .factory('requestFactory', function ($q, $http) {
    // Service logic
    // ...

    var myRequests = function(){
      var deferred = $q.defer();
      $http.post('/api/requests/me').success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var request = function(details){
      var deferred = $q.defer();
      $http.post('/api/requests/new', details).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }
    // Public API here
    return {
      request: function (details) {
        var deferred = $q.defer()
        request(details).then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      myRequests: function () {
        var deferred = $q.defer()
        myRequests().then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      }

    };
  });
