'use strict';

angular.module('heroesApp')
  .factory('requestFactory', function ($q, $http) {
    // Service logic
    // ...

    var request = function(){
      var deferred = $q.defer();
      $http.post('/api/request/').success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }
    // Public API here
    return {
      request: function () {
        var deferred = $q.defer()
        request().then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      }
    };
  });
