'use strict';

angular.module('gitcheeseApp')
	.service('Security', function ($rootScope, localStorageService, Context) {
	    var accessTokenStorageKey = 'accessToken';

	    var initializeContext = function () {
	        var accessToken = localStorageService.get(accessTokenStorageKey);
	        if (accessToken && accessToken !== '') {
	            Context.refreshCurrentUser();
	        }
	    }

	    initializeContext();

	    this.storeAccessToken = function (accessToken) {
	        localStorageService.set(accessTokenStorageKey, accessToken);
	        Context.refreshCurrentUser();
	    };

	    this.getAccessToken = function () {
	        return localStorageService.get(accessTokenStorageKey);
	    };

	    this.removeAccessToken = function () {
	        localStorageService.remove(accessTokenStorageKey);
	        Context.removeCurrentUser();
	    };

	    this.hasAccessToken = function () {
	        return !!localStorageService.get(accessTokenStorageKey);
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