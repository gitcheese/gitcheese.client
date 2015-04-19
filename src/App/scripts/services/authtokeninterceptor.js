'use strict';

/**
 * @ngdoc service
 * @name gitcheeseApp.AuthTokenInterceptor
 * @description
 * # AuthTokenInterceptor
 * Factory in the gitcheeseApp.
 */
angular.module('gitcheeseApp')
  .factory('AuthTokenInterceptor', function($q, Security) {
    return {
      request: function(config) {
        var tokenData = Security.getAccessToken();
        if (tokenData) {
          config.headers.Authorization = "Bearer " + tokenData.access_token;
        }
        return $q.when(config);
      }
    };
  });