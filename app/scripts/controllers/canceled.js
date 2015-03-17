'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:CanceledCtrl
 * @description
 * # CanceledCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('CanceledCtrl', function($scope, $routeParams, Restangular) {
		Restangular.one('projects', $routeParams.projectId).get().then(function(project) {
			$scope.project = project;
		});
	});