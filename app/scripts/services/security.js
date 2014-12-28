'use strict';

/**
 * @ngdoc service
 * @name gitcheeseApp.Security
 * @description
 * # Security
 * Service in the gitcheeseApp.
 */
angular.module('gitcheeseApp')
	.service('Security', function($rootScope, $cookieStore) {
		var tokenDataKey = 'tokenData';

		this.storeAccessToken = function(tokenData) {
			$cookieStore.put(tokenDataKey, tokenData);
			$rootScope.$broadcast('access_token_changed', tokenData.access_token);
		};

		this.getAccessToken = function() {
			return $cookieStore.get(tokenDataKey);
		};

		this.hasAccessToken = function() {
			return !!$cookieStore.get(tokenDataKey);
		};

		this.storeRegistrationExternalToken = function(provider, token) {
			this.externalToken = {
				provider: provider,
				token: token
			};
		}

		this.getRegistrationExternalToken = function() {
			return this.externalToken;
		};
	});