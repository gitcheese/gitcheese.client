'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectBadge', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/project-badge.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectBadgeController',
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectBadgeController', function () { });