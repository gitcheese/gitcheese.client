'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ProjectdetailsCtrl
 * @description
 * # ProjectdetailsCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
  .controller('ProjectdetailsCtrl', function ($scope, ProjectDetails) {
    $scope.project = ProjectDetails.get();
  });
