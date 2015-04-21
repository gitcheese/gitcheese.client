'use strict';

angular.module('gitcheeseApp')
	.service('Security', function ($rootScope, $cookieStore) {
	    var tokenDataKey = 'tokenData';

	    this.storeAccessToken = function (tokenData) {
	        $cookieStore.put(tokenDataKey, tokenData);
	        $rootScope.$broadcast('access_token_stored');
	    };

	    this.getAccessToken = function () {
	        return $cookieStore.get(tokenDataKey);
	    };

	    this.removeAccessToken = function () {
	        $cookieStore.remove(tokenDataKey);
	        $rootScope.$broadcast('access_token_removed');
	    };

	    this.hasAccessToken = function () {
	        return !!$cookieStore.get(tokenDataKey);
	    };

	    this.storeOauthRegistrationData = function (provider, token) {
	        this.oauthRegistrationData = {
	            provider: provider,
	            token: token
	        };
	    };

	    this.getOauthRegistrationData = function () {
	        return this.oauthRegistrationData;
	    };

	    this.storeBasicRegistrationData = function (email, password) {
	        this.basicRegistrationData = {
	            email: email,
	            password: password
	        };
	    };

	    this.getBasicRegistrationData = function () {
	        return this.basicRegistrationData;
	    };
	});