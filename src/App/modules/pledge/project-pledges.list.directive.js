'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectPledgesList', function (gcProjectPledgesListLinkFn) {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/project-pledges.list.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectPledgesListController',
	        link: gcProjectPledgesListLinkFn,
	        scope: {
	            projectId: '@',
	            caption: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectPledgesListController', function (Restangular) {
        var vm = this;
        vm.init = function () {
            Restangular.one('projects', vm.projectId).all('pledges').getList({
                $orderby: 'ConfirmationDate desc'
            }).then(function (pledges) {
                vm.pledges = pledges;
            });
        };
    });

angular.module('gitcheese.app.pledge')
    .factory('gcProjectPledgesListLinkFn', function () {
        return function (scope, element, attributes) {
            attributes.$observe('projectId', function (projectId) {
                if (projectId)
                    scope.vm.init();
            });
        };
    });