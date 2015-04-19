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

			project.getList('pledges', {
				$orderby: 'ConfirmationDate desc'
			}).then(function(pledges) {
				$scope.pledges = pledges;

				pledges.customGET('summary').then(function(summary) {
					$scope.pledgeSummary = summary;
				});
			});
		});
	});