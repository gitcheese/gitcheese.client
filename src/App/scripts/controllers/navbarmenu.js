'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:NavbarmenuCtrl
 * @description
 * # NavbarmenuCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('NavbarmenuCtrl', function($scope, $location, Security) {
		$scope.logout = function() {
			Security.removeAccessToken();
		};
	});