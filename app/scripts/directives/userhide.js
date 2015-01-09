'use strict';

/**
 * @ngdoc directive
 * @name gitcheeseApp.directive:userHide
 * @description
 * # userHide
 */
angular.module('gitcheeseApp')
	.directive('userHide', function(Security) {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				if (Security.hasAccessToken()) {
					element.hide();
				} else {
					element.show();
				}

				scope.$on('access_token_removed', function() {
					element.show();
				});

				scope.$on('access_token_stored', function() {
					element.hide();
				});
			}
		};
	});