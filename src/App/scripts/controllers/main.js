'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
