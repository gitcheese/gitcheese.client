'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:PledgeCtrl
 * @description
 * # PledgeCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
  .controller('PledgeCtrl', function ($scope) {
    $scope.paypal = function(){
	alert('Donation accepted!')
	}
  });
