'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
  .controller('DashboardCtrl', function ($scope, ProjectService) {
    $scope.projects = ProjectService.get();
  });
