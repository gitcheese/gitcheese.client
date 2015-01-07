'use strict';

/**
 * @ngdoc service
 * @name gitcheeseApp.ApiConfig
 * @description
 * # ApiConfig
 * Constant in the gitcheeseApp.
 */
angular.module('gitcheeseApp')
	.constant('ApiConfig', {
		address: {
			'localhost': 'http://localhost:8090',
			'www.gitcheese.com': 'http://gitcheese.cloudapp.net'
		}
	});