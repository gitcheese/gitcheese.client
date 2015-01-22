'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ProjectdetailsCtrl
 * @description
 * # ProjectdetailsCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('ProjectdetailsCtrl', function($scope, $routeParams, Restangular) {
		Restangular.one('projects', $routeParams.id).get().then(function(project) {
			$scope.project = project;
		});
	});