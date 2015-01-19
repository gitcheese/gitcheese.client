'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('DashboardCtrl', function($scope, Restangular) {
		Restangular.all('projects').getList({
			$orderby: 'FullName'
		}).then(function(projects) {
			$scope.projects = projects;
		})
	});