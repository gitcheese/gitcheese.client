'use strict';

angular.module('gitcheeseApp')
	.controller('ProjectdetailsCtrl', function ($scope, $routeParams, Restangular) {
	    Restangular.one('projects', $routeParams.id).get().then(function (project) {
	        $scope.project = project;

	        project.getList('pledges', {
	            $orderby: 'ConfirmationDate desc'
	        }).then(function (pledges) {
	            $scope.pledges = pledges;
	        });

	        project.one('details').get().then(function (details) {
	            $scope.details = details;
	        });
	    });
	});