'use strict';

angular.module('gitcheeseApp')
  .factory('ProjectService', function($resource) {
    return $resource('fakeData/projects.json', {}, {
      get: {
        method: 'GET',
        isArray: true
      }
    });
  });