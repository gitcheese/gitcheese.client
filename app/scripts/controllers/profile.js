'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('ProfileCtrl', function($scope, $location, Restangular) {
		Restangular.one('user').get().then(function(profile) {
			$scope.profile = profile;
		});

		$scope.save = function() {
			$scope.profile.put().then(function(){
				$location.path("/dashboard")
			});
		};
	});