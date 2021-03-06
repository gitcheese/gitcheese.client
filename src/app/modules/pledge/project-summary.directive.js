﻿'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectSummary', function (gcProjectSummariesEditorLinkFn) {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/project-summary.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectSummaryController',
	        link: gcProjectSummariesEditorLinkFn,
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectSummaryController', function (Restangular) {
        var vm = this;
        vm.init = function () {
            Restangular.one('projects', vm.projectId).one('summary').get()
                .then(function (summary) {
                    vm.summary = summary;
                });
        };
    });

angular.module('gitcheese.app.pledge')
    .factory('gcProjectSummariesEditorLinkFn', function () {
        return function (scope, element, attributes) {
            attributes.$observe('projectId', function (projectId) {
                if (projectId)
                    scope.vm.init();
            });
        };
    });