'use strict';

angular.module('gitcheeseApp')
	.factory('ProjectDetails', function($resource) {
		return $resource('fakeData/project.json', {}, {
			get: {
				method: 'GET',
				isArray: false
			}
		});
	});