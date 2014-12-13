'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
  .controller('ProfileCtrl', function ($scope, ProfileService) {
    $scope.profile = ProfileService.get();
  });
