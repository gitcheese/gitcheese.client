'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectBadgeMarkups', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/project-badge-markups.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectBadgeMarkupsController',
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectBadgeMarkupsController', function () { });