'use strict';

angular.module('gitcheeseApp')
  .factory('ProfileService', function ($resource) {
    return $resource('fakeData/profile.json', {}, {
      get: {
        method: 'GET'
      }
    });
  });
