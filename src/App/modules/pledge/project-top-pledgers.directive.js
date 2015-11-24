'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectTopPledgers', function (gcProjectTopPledgersLinkFn) {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/project-top-pledgers.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectTopPledgersController',
	        link: gcProjectTopPledgersLinkFn,
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectTopPledgersController', function (Restangular) {
        var vm = this;
        vm.init = function () {
            Restangular.one('projects', vm.projectId).all('pledgers').getList({
                $orderby: 'TotalAmount desc'
            }).then(function (pledgers) {
                vm.pledgers = pledgers;
            });
        };
    });

angular.module('gitcheese.app.pledge')
    .factory('gcProjectTopPledgersLinkFn', function () {
        return function (scope, element, attributes) {
            attributes.$observe('projectId', function (projectId) {
                if (projectId)
                    scope.vm.init();
            });
        };
    });