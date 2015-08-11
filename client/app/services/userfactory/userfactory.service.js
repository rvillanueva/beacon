'use strict';

angular.module('heroesApp')
  .factory('userFactory', function ($q, $http) {
    // Service logic
    // ...

    var getUser = function(id){
      var deferred = $q.defer();
      $http.get('/api/users/' + id).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    // Public API here
    return {
      getUser: function (id) {
        var deferred = $q.defer()
        getUser(id).then(function(data){
          deferred.resolve(data);
        }).catch(function(err) {
          console.log(err)
          deferred.reject(err)
        })
        return deferred.promise;
      }
    };
  });
