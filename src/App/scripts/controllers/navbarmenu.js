'use strict';

angular.module('gitcheeseApp')
	.controller('NavbarmenuCtrl', function ($scope, $location, Restangular, Security, ApiConfig, $window) {

	    Restangular.one('users', 'me').get().then(function (profile) {
	        $scope.profile = profile;
	        $scope.avatarUrl = ApiConfig.address[$window.location.hostname] + '/users/' + profile.id + '/avatars';
	    });

	    $scope.logout = function () {
	        Security.removeAccessToken();
	    };
	});