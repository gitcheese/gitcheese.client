'use strict';

angular.module('gitcheese.app')
	.constant('apiConstants', {
	    address: {
	        'localhost': 'http://localhost:9000/api/v1',
	        'www.gitcheese.com': 'http://gitcheese.cloudapp.net'
	    }
	});