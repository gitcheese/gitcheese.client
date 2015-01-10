'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('LoginCtrl', function($scope, $hello, $location, notify, Restangular, Security) {

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
				username: $scope.login.username,
				password: $scope.login.password
			};

			$scope.logging = true;

			Restangular.service('auth/tokens').post($.param(data)).then(function(success) {
				Security.storeAccessToken(success);
				$location.path('/dashboard');
			}, function() {
				$scope.logging = false;
				notify({
					message: 'Invalid username or password.',
					classes: 'alert-danger'
				});
			});
		};

		$scope.basicRegistration = function() {
			$scope.registering = true;

			Restangular.service('accounts/basic').post($scope.register).then(function() {
				$location.path('/accountCreated');
			}, function() {
				$scope.registering = false;
				notify({
					message: 'Username allready in use',
					classes: 'alert-danger'
				});
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