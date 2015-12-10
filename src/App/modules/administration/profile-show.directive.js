'use strict';

angular.module('gitcheese.app.administration')
	.directive('gcProfileShow', function () {
	    return {
	        restrict: 'A',
	        controller: 'gcProfileShowController'
	    };
	});

angular.module('gitcheese.app.administration')
	.controller('gcProfileShowController', function ($rootScope, $element) {
	    $rootScope.$watch('context.profile', function (newProfile) {
	        if (newProfile) {
	            $element.show();
	        } else {
	            $element.hide();
	        };
	    });
	});