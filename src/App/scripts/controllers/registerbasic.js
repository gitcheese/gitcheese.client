'use strict';

angular.module('gitcheeseApp')
	.controller('RegisterBasicCtrl', function ($scope, $location, $timeout, Restangular, Security, Context) {
	    var basicRegistrationData = Security.getBasicRegistrationData();
	    if (basicRegistrationData == 'undefined') {
	        $location.path('/login');
	    }

	    var loginData = $.param({
	        grant_type: 'password',
	        username: basicRegistrationData.email,
	        password: basicRegistrationData.password
	    });

	    $scope.registering = true;
	    Restangular.service('accounts/basic').post(basicRegistrationData).then(function () {
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
	        profile.one('avatars').customPOST().then(function () {
	            waitForAvatar();
	        });
	    };

	    var waitForAvatar = function () {
	        Restangular.one('users', 'me').get().then(function (profile) {
	            if (profile.avatarId) {
	                Context.refreshCurrentUser(profile);
	                $location.path('basicaccountcreated')
	            } else {
	                $timeout(waitForAvatar, 500);
	            }
	        });
	    }
	});