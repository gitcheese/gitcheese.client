'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('LoginCtrl', function($scope, $hello) {
		$scope.login = function(provider) {
			$hello.logout(provider);
			$hello(provider).login();
		};
	});