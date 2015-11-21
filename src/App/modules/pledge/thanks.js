'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ThanksCtrl
 * @description
 * # ThanksCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('ThanksCtrl', function($scope, $routeParams, Restangular) {
		Restangular.one('projects', $routeParams.projectId).get().then(function(project) {
			$scope.project = project;
		});
	});