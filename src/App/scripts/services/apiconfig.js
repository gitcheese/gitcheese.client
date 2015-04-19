'use strict';

/**
 * @ngdoc service
 * @name gitcheeseApp.ApiConfig
 * @description
 * # ApiConfig
 * Constant in the gitcheeseApp.
 */
angular.module('gitcheeseApp.config', [])
	.constant('ApiConfig', {
		address: {
			'localhost': 'http://localhost:9000/api/v1',
			'www.gitcheese.com': 'http://gitcheese.cloudapp.net'
		}
	});