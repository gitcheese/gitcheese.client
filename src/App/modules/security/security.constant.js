'use strict';

angular.module('gitcheese.app.security')
	.constant('oauthClientIds', {
	    facebook: {
	        'localhost': '551034988332783',
	        'gitcheese.azurewebsites.net': '551034988332783'
	    },
	    github: {
	        'localhost': '2fdbff10bcdf011bd096',
	        'gitcheese.azurewebsites.net': 'ea5846887213a8dbb64a'
	    },
	    windows: {
	        'localhost': 'NONE',
	        'gitcheese.azurewebsites.net': '0000000044136916'
	    },
	    twitter: {
	        'localhost': 'NONE',
	        'gitcheese.azurewebsites.net': 'Ty2SCogbq8BAz0ZAuTDfdrRkw'
	    },
	    google: {
	        'localhost': '977789156190-4pcktc92gp3hs2gg04dvs5d7q8l00idt.apps.googleusercontent.com',
	        'gitcheese.azurewebsites.net': '977789156190-4pcktc92gp3hs2gg04dvs5d7q8l00idt.apps.googleusercontent.com'
	    },
	    dropbox: {
	        'localhost': '2yklp1qmavijykg',
	        'gitcheese.azurewebsites.net': '2yklp1qmavijykg'
	    },
	    linkedin: {
	        'localhost': '751yukwz36ycow',
	        'gitcheese.azurewebsites.net': '751yukwz36ycow'
	    }
	});