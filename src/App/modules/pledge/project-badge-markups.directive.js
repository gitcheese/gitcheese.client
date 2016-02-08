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
    .controller('gcProjectBadgeMarkupsController', function (apiConstants, $window) {
        var vm = this;

        vm.pledgeUrl = $window.location.origin + '/app/#/projects/' + vm.projectId + '/pledges/create';
        vm.badgeUrl = apiConstants.address[$window.location.hostname] + '/projects/' + vm.projectId + '/badges';
    });