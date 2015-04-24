'use strict';

/**
 * @ngdoc directive
 * @name gitcheeseApp.directive:userHide
 * @description
 * # userHide
 */
angular.module('gitcheeseApp')
	.directive('userHide', function (Context) {
	    return {
	        restrict: 'A',
	        link: function postLink(scope, element, attrs) {
	            scope.context = Context;
	            if (scope.context.user) {
	                element.hide();
	            } else {
	                element.show();
	            }

	            scope.$watch('context.user', function (newUser) {
	                if (newUser) {
	                    element.hide();
	                } else {
	                    element.show();
	                };
	            });
	        }
	    };
	});