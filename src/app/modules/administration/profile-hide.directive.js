'use strict';

angular.module('gitcheese.app.administration')
	.directive('gcProfileHide', function () {
	    return {
	        restrict: 'A',
	        controller: 'gcProfileHideController'
	    };
	});

angular.module('gitcheese.app.administration')
	.controller('gcProfileHideController', function ($rootScope, $element) {
	    $rootScope.$watch('context.profile', function (newProfile) {
	        if (newProfile) {
	            $element.hide();
	        } else {
	            $element.show();
	        };
	    });
	});