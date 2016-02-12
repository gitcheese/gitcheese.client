﻿'use strict';

angular.module('gitcheese.app')
    .constant('appConstants', {
    	addressPostfix: {
    	    'localhost': '/app',
    	    'www.gitcheese.com': ''
    	}
    })
	.constant('apiConstants', {
	    address: {
	        'localhost': 'http://localhost:9000/api/v1',
	        'www.gitcheese.com': 'https://api.gitcheese.com/v1'
	    }
	});