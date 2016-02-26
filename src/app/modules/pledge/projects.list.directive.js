'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcProjectsList', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/projects.list.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProjectsListController',
	        scope: {
	            caption: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcProjectsListController', function (Restangular) {
        var vm = this;
        Restangular.all('projects').getList({
            $orderby: 'Name'
        }).then(function (projects) {
            vm.projects = projects;
        });
    });