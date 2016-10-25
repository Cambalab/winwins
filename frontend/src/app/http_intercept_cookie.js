(function() {
  'use strict';

  angular.module('winwins')
    .provider('myCSRF', myCsrf);

      function myCsrf($httpProvider){
      var headerName = 'X-XSRF-TOKEN';
      var cookieName = 'X-XSRF-TOKEN';
      var allowedMethods = [];

      this.setHeaderName = function(n) {
        headerName = n;
      }

      this.setCookieName = function(n) {
        cookieName = n;
      }

      this.setAllowedMethods = function(n) {
        allowedMethods = n;
      }

      this.$get = ['$cookies', function($cookies){
        return {
          'request': function(config) {
            if(allowedMethods.indexOf(config.method) === -1) {
              // do something on success
              config.headers[headerName] = $cookies[cookieName];
            }
            return config;
          }
        }
      }];

      $httpProvider.interceptors.push('myCSRF');
    }
});