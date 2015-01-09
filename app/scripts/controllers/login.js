'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('LoginCtrl', function($scope, $hello, $location, Restangular, Security) {

		$scope.oauthLogin = function(provider) {

			$hello(provider).login().then(function(response) {
				var data = {
					grant_type: 'client_token',
					provider: response.authResponse.network,
					token: response.authResponse.access_token
				};

				$scope.logging = true;

				Restangular.service('auth/tokens').post($.param(data)).then(function(success) {
					Security.storeAccessToken(success);
					$location.path('/dashboard');
				}, function() {
					$scope.logging = false;
					$scope.registering = true;

					Security.storeRegistrationExternalToken(data.provider, data.token);
					register(data.provider, data.token);
				});
			});
		};

		$scope.basicLogin = function() {
			var data = {
				grant_type: 'password',
				username: $scope.basicLoginData.username,
				password: $scope.basicLoginData.password
			};

			$scope.logging = true;

			Restangular.service('auth/tokens').post($.param(data)).then(function(success) {
				Security.storeAccessToken(success);
				$location.path('/dashboard');
			});
		};

		$scope.basicRegistration = function() {
			$scope.registering = true;

			Restangular.service('accounts/basic').post($scope.basic).then(function() {
				$location.path('/accountCreated');
			});
		};

		var register = function(provider, accessToken) {
			Restangular.several('accounts/oauth', provider)
				.post({
					token: accessToken
				}).then(function() {
					$location.path('/accountCreated');
				});
		};
	});