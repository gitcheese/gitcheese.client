'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
