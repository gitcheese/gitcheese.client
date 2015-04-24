'use strict';

angular.module('gitcheeseApp')
	.directive('userShow', function (Context) {
	    return {
	        restrict: 'A',
	        link: function postLink(scope, element, attrs) {
	            scope.context = Context;
	            if (scope.context.user) {
	                element.show();
	            } else {
	                element.hide();
	            }

	            scope.$watch('context.user', function (newUser) {
	                if (newUser) {
	                    element.show();
	                } else {
	                    element.hide();
	                };
	            });
	        }
	    };
	});