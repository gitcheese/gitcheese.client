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

		$scope.login = function(provider) {
			$hello(provider).login().then(function(response) {
				var data = {
					grant_type: 'client_token',
					provider: response.authResponse.network,
					token: response.authResponse.access_token
				};

				Restangular.service('auth/tokens').post($.param(data)).then(function(success) {
					Security.storeAccessToken(success);
					$location.path('/dashboard');
				}, function() {
					Security.storeRegistrationExternalToken(data.provider, data.token);
					register(data.provider, data.token);
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