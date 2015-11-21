'use strict';

angular.module('gitcheese.app.security')
	.controller('registerOauthController', function ($location, $hello, $timeout, Restangular, security, context) {
	    var vm = this;
	    var loginData;
	    var oauthRegistrationData;

	    vm.init = function () {
	        oauthRegistrationData = security.getOauthRegistrationData();
	        if (typeof oauthRegistrationData == 'undefined') {
	            $location.path('/login');
	            return;
	        }

	        loginData = $.param({
	            grant_type: 'client_token',
	            provider: oauthRegistrationData.provider,
	            token: oauthRegistrationData.token
	        });

	        vm.registering = true;
	        Restangular.several('memberships', oauthRegistrationData.provider).post({ token: oauthRegistrationData.token }).then(function () {
	            vm.registering = false;
	            login();
	        });
	    }

	    var login = function () {
	        vm.completing = true;
	        Restangular.service('auth/tokens').post(loginData).then(function (token) {
	            security.storeToken(token);
	            getProfile();
	        }, function () {
	            $timeout(login, 400);
	        });
	    };

	    var getProfile = function () {
	        Restangular.one('profiles', security.getToken().membershipId).get()
                .then(function () {
                    updateAvatar();
                }, function () {
                    $timeout(getProfile, 400);
                });
	    };

	    var updateAvatar = function () {
	        $hello(oauthRegistrationData.provider).api('/me').then(function (me) {
	            Restangular.one('profiles', security.getToken().membershipId).one('avatars').customPOST({ url: me.thumbnail })
                    .then(function () {
                        waitForAvatar();
                    });
	        });
	    };

	    var waitForAvatar = function () {
	        Restangular.one('profiles', security.getToken().membershipId).get()
                .then(function (profile) {
                    if (profile.avatarId) {
                        context.refreshProfile(security.getToken().membershipId);
                        $location.path('oauthaccountcreated');
                    } else {
                        $timeout(waitForAvatar, 400);
                    }
                });
	    }

	    /* istanbul ignore next */
	    if (typeof jasmine === 'undefined') {
	        vm.init();
	    }
	});