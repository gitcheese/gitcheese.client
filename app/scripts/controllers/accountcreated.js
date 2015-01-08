'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:AccountcreatedCtrl
 * @description
 * # AccountcreatedCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('AccountcreatedCtrl', function($scope, $location, $timeout, Security, Restangular) {
		$scope.basicCreated = Security.getRegistrationExternalToken() === undefined;
		$scope.creatingOauth = Security.getRegistrationExternalToken() !== undefined;

		$scope.loginOauth = function() {
			var tokenData = Security.getRegistrationExternalToken();
			var loginData = $.param({
				grant_type: 'client_token',
				provider: tokenData.provider,
				token: tokenData.token
			});
			Restangular.service('auth/tokens').post(loginData).then(function(success) {
				Security.storeAccessToken(success);
				$scope.getProfile();
			}, function() {
				$timeout($scope.loginOauth, 250);
			});
		};

		$scope.getProfile = function() {
			Restangular.one('user').get().then(function(data) {
				if (data) {
					$scope.creatingOauth = false;
				} else {
					$timeout($scope.getProfile, 250);
				}
			}, function() {
				$timeout($scope.getProfile, 250);
			});
		};

		if ($scope.creatingOauth) {
			$scope.loginOauth();
		}
	});