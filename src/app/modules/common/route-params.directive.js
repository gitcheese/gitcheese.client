'use strict';

angular.module('gitcheese.app.common')
	.directive('gcRouteParams', function () {
	    var directive = {
	        restrict: 'A',
	        controller: 'gcRouteParamsController',
	        bindToController: true,
	        controllerAs: 'routeParams'
	    };

	    return directive;
	});

angular.module('gitcheese.app.common')
	.controller('gcRouteParamsController', function ($routeParams) {
	    angular.extend(this, $routeParams);
	});