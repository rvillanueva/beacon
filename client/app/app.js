'use strict';

angular.module('heroesApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'btford.socket-io',
    'ui.bootstrap',
    'ngMaterial',
    'xeditable',
    'angularHelpOverlay'
  ])
  .config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

.factory('authInterceptor', function($rootScope, $q, $cookieStore, $location) {
  return {
    // Add authorization token to headers
    request: function(config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    },

    // Intercept 401s and redirect you to login
    responseError: function(response) {
      if (response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  };
})

.run(function($rootScope, $location, Auth) {
  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$routeChangeStart', function(event, next) {
    Auth.isLoggedInAsync(function(loggedIn) {
      var verified = Auth.isVerified();
      var destination = $location.url();
      if (!verified && loggedIn && destination.indexOf('/verify/email') == -1){
        Auth.refresh(function(currentUser){
          if (currentUser.role == 'unverified'){
            $location.path('/verify');
          }
        })
      }
      if (next.authenticate && !loggedIn) {
        $location.path('/login');
      }
    });
  });
});
