'use strict';

angular.module('heroesApp')
  .factory('requestFactory', function ($q, $http) {
    // Service logic
    // ...

    var myRequests = function(){
      var deferred = $q.defer();
      $http.get('/api/missions/mine/').success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var getRequest = function(id){
      var deferred = $q.defer();
      console.log(id)
      $http.get('/api/missions/' + id).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var newMission = function(details){
      var deferred = $q.defer();
      $http.post('/api/missions/new', details).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var accept = function(id){
      var deferred = $q.defer();
      $http.post('/api/missions/accept/' + id).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var returnUsers = function(id){
      var deferred = $q.defer();
      $http.get('/api/missions/find/' + id) .success(function(data){
        deferred.resolve(data);
      }).error(function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var tagUser = function(params){
      var deferred = $q.defer();
      $http.post('/api/missions/tag/' + params.mission, params).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var returnMissions = function(){
      var deferred = $q.defer();
      $http.get('/api/missions/users/find').success(function(data){
        deferred.resolve(data);
      }).error(function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var tagMission = function(params){
      var deferred = $q.defer();
      $http.post('/api/missions/users/tag/', params).success(function(data){
        console.log(data)
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var abortMission = function(id){
      var deferred = $q.defer();
      $http.post('/api/missions/cancel/' + id).success(function(data){
        deferred.resolve(data);
      }, function(err){
        deferred.reject(err)
      })
      return deferred.promise;
    }


    // Public API here
    return {
      newMission: function (details) {
        var deferred = $q.defer()
        newMission(details).then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      accept: function (details) {
        var deferred = $q.defer()
        accept(details).then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      returnUsers: function (id) {
        var deferred = $q.defer()
        returnUsers(id).then(function(data){
          deferred.resolve(data);
        }).catch(function(err) {
          console.log(err)
          deferred.reject(err)
        })
        return deferred.promise;
      },
      tagUser: function (params) {
        var deferred = $q.defer()
        tagUser(params).then(function(data){
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      returnMissions: function () {
        var deferred = $q.defer()
        returnMissions().then(function(data){
          deferred.resolve(data);
        }).catch(function(err) {
          console.log(err)
          deferred.reject(err)
        })
        return deferred.promise;
      },
      tagMission: function (params) {
        var deferred = $q.defer()
        tagMission(params).then(function(data){
          deferred.resolve(data);
        }).catch(function(err) {
          console.log(err)
          deferred.reject(err)
        })
        return deferred.promise;
      },
      getRequest: function (id) {
        var deferred = $q.defer()
        getRequest(id).then(function(data){
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
      },
      abortMission: function (id) {
        var deferred = $q.defer()
        abortMission(id).then(function(data){
          deferred.resolve(data);
        }).catch(function(err) {
          console.log(err)
          deferred.reject(err)
        })
        return deferred.promise;
      }

    };
  });
