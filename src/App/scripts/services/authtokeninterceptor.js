'use strict';

angular.module('gitcheeseApp')
  .factory('AuthTokenInterceptor', function ($q, localStorageService) {
      return {
          request: function (config) {
              var accessToken = localStorageService.get('accessToken');
              if (accessToken !== '') {
                  config.headers.Authorization = "Bearer " + accessToken;
              }
              return $q.when(config);
          }
      };
  });