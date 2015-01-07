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
		},
		twitter: {
			'localhost': 'NONE',
			'www.gitcheese.com': 'Ty2SCogbq8BAz0ZAuTDfdrRkw'
		},
		google: {
			'localhost': '977789156190-4pcktc92gp3hs2gg04dvs5d7q8l00idt.apps.googleusercontent.com',
			'www.gitcheese.com': '977789156190-4pcktc92gp3hs2gg04dvs5d7q8l00idt.apps.googleusercontent.com'
		},
		dropbox: {
			'localhost': '2yklp1qmavijykg',
			'www.gitcheese.com': '2yklp1qmavijykg'
		},
		linkedin: {
			'localhost': '751yukwz36ycow',
			'www.gitcheese.com': '751yukwz36ycow'
		}
	});