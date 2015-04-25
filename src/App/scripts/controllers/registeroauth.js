'use strict';

angular.module('gitcheeseApp')
	.controller('RegisterOauthCtrl', function ($scope, $location, $hello, $timeout, Restangular, Security, Context) {
	    var oauthRegistrationData = Security.getOauthRegistrationData();
	    if (oauthRegistrationData == 'undefined') {
	        $location.path('/login');
	    }

	    var loginData = $.param({
	        grant_type: 'client_token',
	        provider: oauthRegistrationData.provider,
	        token: oauthRegistrationData.token
	    });

	    $scope.registering = true;
	    Restangular.several('accounts/oauth', oauthRegistrationData.provider)
            .post({
                token: oauthRegistrationData.token
            }).then(function () {
                $scope.registering = false;
                login();
            });

	    var login = function () {
	        $scope.completing = true;
	        Restangular.service('auth/tokens').post(loginData).then(function (success) {
	            Security.storeAccessToken(success.access_token);
	            getProfile();
	        }, function () {
	            $timeout(login, 500);
	        });
	    };

	    var getProfile = function () {
	        Restangular.one('users', 'me').get().then(function (profile) {
	            if (profile) {
	                updateAvatar(profile)
	            } else {
	                $timeout(getProfile, 500);
	            }
	        });
	    };

	    var updateAvatar = function (profile) {
	        $hello(oauthRegistrationData.provider).api('/me').then(function (me) {
	            profile.one('avatars').customPOST({ url: me.thumbnail }).then(function () {
	                waitForAvatar();
	            });
	        });
	    };

	    var waitForAvatar = function () {
	        Restangular.one('users', 'me').get().then(function (profile) {
	            if (profile.avatarId) {
	                Context.refreshCurrentUser();
	                $location.path('oauthaccountcreated')
	            } else {
	                $timeout(waitForAvatar, 500);
	            }
	        });
	    }
	});