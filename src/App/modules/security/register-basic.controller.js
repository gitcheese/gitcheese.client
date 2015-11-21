'use strict';

angular.module('gitcheese.app.security')
	.controller('registerBasicController', function ($location, $timeout, Restangular, security, context) {
	    var vm = this;
	    var loginData;

	    vm.init = function () {
	        var basicRegistrationData = security.getBasicRegistrationData();
	        if (typeof basicRegistrationData == 'undefined') {
	            $location.path('/login');
	            return;
	        }

	        loginData = $.param({
	            grant_type: 'password',
	            username: basicRegistrationData.email,
	            password: basicRegistrationData.password
	        });

	        vm.registering = true;
	        Restangular.service('memberships').post(basicRegistrationData).then(function () {
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
	        Restangular.one('profiles', security.getToken().membershipId).one('avatars').customPOST()
                .then(function () {
                    waitForAvatar();
                });
	    };

	    var waitForAvatar = function () {
	        Restangular.one('profiles', security.getToken().membershipId).get()
                .then(function (profile) {
                    if (profile.avatarId) {
                        context.refreshProfile(security.getToken().membershipId);
                        $location.path('basicaccountcreated');
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