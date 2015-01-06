'use strict';

/**
 * @ngdoc service
 * @name gitcheeseApp.OauthClientIds
 * @description
 * # OauthClientIds
 * Constant in the gitcheeseApp.
 */
angular.module('gitcheeseApp')
	.constant('OauthClientIds', {
		facebook: {
			'localhost': '551034988332783',
			'www.gitcheese.com': '551034988332783'
		},
		github: {
			'localhost': '2fdbff10bcdf011bd096',
			'www.gitcheese.com': 'ea5846887213a8dbb64a'
		},
		windows: {
			'localhost': 'NONE',
			'www.gitcheese.com': '0000000044136916'
		}
	});