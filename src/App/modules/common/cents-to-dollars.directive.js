'use strict';

angular.module('gitcheese.app.common')
	.directive('centsToDollars', function (centsToDollarsLinkFn) {
	    var directive = {
	        restrict: 'A',
	        require: 'ngModel',
	        link: centsToDollarsLinkFn
	    };

	    return directive;
	});

angular.module('gitcheese.app.common')
	.factory('centsToDollarsLinkFn', function () {
	    return function (scope, element, attributes, ngModel) {
	        ngModel.$parsers.push(function (text) {
	            return parseInt(text) * 100;
	        });
	        ngModel.$formatters.push(function (text) {
	            return parseInt(text) / 100;
	        });
	    };
	});