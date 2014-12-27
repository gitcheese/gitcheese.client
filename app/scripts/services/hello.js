'use strict';

angular.module('hello', [])
	.factory('$hello', function($window) {
		return $window.hello;
	});