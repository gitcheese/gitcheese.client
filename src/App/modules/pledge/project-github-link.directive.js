'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectGithubLink', function (gcProjectGithubLinkLinkFn) {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/project-github-link.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectGithubLinkController',
	        link: gcProjectGithubLinkLinkFn,
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectGithubLinkController', function (Restangular) {
        var vm = this;
        vm.init = function () {
            Restangular.one('projects', vm.projectId).get()
                .then(function (project) {
                    vm.project = project;
                });
        };
    });


angular.module('gitcheese.app.pledge')
    .factory('gcProjectGithubLinkLinkFn', function () {
        return function (scope, element, attributes) {
            attributes.$observe('projectId', function (projectId) {
                if (projectId)
                    scope.vm.init();
            });
        };
    });