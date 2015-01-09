'use strict';

/**
 * @ngdoc directive
 * @name gitcheeseApp.directive:userShow
 * @description
 * # userShow
 */
angular.module('gitcheeseApp')
	.directive('userShow', function(Security) {
		return {
			restrict: 'A',
			link: function postLink(scope, element, attrs) {
				if (Security.hasAccessToken()) {
					element.show();
				} else {
					element.hide();
				}

				scope.$on('access_token_removed', function() {
					element.hide();
				});

				scope.$on('access_token_stored', function() {
					element.show();
				});
			}
		};
	});