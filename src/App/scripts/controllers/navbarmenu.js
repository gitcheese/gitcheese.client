'use strict';

angular.module('gitcheeseApp')
	.controller('NavbarmenuCtrl', function ($scope, Restangular, Security, Context) {

	    $scope.context = Context;

	    $scope.logout = function () {
	        Security.removeAccessToken();
	    };
	});