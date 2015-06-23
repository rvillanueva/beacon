'use strict';

angular.module('heroesApp')
  .factory('profileFactory', function($q, $http) {
    // Service logic
    // ...

    var me = function() {
      var deferred = $q.defer();
      $http.get('/api/users/me').success(function(data) {
        deferred.resolve(data);
      }).error(function(err) {
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var saveProfile = function(profile) {
      var deferred = $q.defer();
      $http.patch('/api/users/me', profile).success(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var sendPhone = function(phone) {
      var deferred = $q.defer();
      $http.post('/api/verify/phone', phone).success(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var sendEmail = function(email) {
      var deferred = $q.defer();
      $http.post('/api/verify/email', email).success(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var verifyPhone = function(code) {
      var deferred = $q.defer();
      $http.post('/api/verify/phone/' + code).success(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err)
      })
      return deferred.promise;
    }

    var verifyEmail = function(code) {
      var deferred = $q.defer();
      $http.post('/api/verify/email/' + code).success(function(data) {
        deferred.resolve(data);
      }, function(err) {
        deferred.reject(err)
      })
      return deferred.promise;
    }

    // Public API here
    return {
      me: function() {
        var deferred = $q.defer()
        me().then(function(data) {
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      saveProfile: function(profile) {
        var deferred = $q.defer()
        saveProfile(profile).then(function(data) {
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      sendPhone: function(phone) {
        var deferred = $q.defer()
        sendPhone(phone).then(function(data) {
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      sendEmail: function(email) {
        var deferred = $q.defer()
        sendEmail(email).then(function(data) {
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      verifyPhone: function(code) {
        var deferred = $q.defer()
        verifyPhone(code).then(function(data) {
          deferred.resolve(data);
        })
        return deferred.promise;
      },
      verifyEmail: function(code) {
        var deferred = $q.defer()
        verifyEmail(code).then(function(data) {
          deferred.resolve(data);
        })
        return deferred.promise;
      }

    };
  });
