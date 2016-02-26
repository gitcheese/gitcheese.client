'use strict';

angular.module('gitcheese.app.layout')
	.directive('gcNavigationBar', function () {
	    var directive = {
	        templateUrl: 'modules/layout/navigation-bar.directive.html',
	        controller: 'gcNavigationBarController',
	        bindToController: true,
	        controllerAs: 'vm',
	        scope: true
	    };

	    return directive;
	});

angular.module('gitcheese.app.layout')
	.controller('gcNavigationBarController', function (securityService) {
	    var vm = this;

	    vm.logout = function () {
	        securityService.removeToken();
	    };
	});