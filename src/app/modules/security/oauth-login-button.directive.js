'use strict';

angular.module('gitcheese.app.security')
	.directive('gcOauthLoginButton', function () {
	    var directive = {
	        replace: true,
	        templateUrl: 'modules/security/oauth-login-button.directive.html',
	        controller: 'gcOauthLoginButtonController',
	        bindToController: true,
	        controllerAs: 'vm',
	        scope: { provider: '@', size: '@', btnClass: '@', text: '@' }
	    };

	    return directive;
	});

angular.module('gitcheese.app.security')
	.controller('gcOauthLoginButtonController', function (securityService, $location, hello, Restangular, $q, $timeout) {
	    var vm = this;
	    vm.iconSizes = {
	        'lg': 5,
	        'm': 3,
	        'sm': 2,
	        'xs': 1
	    };
	    vm.btnClass = vm.btnClass || "btn-primary";

	    var waitForAvatar = function () {
	        var deffered = $q.defer();
	        var tryToGetAvatar = function () {
	            Restangular.one('profiles', securityService.getToken().membershipId).get()
	                .then(function (profile) {
	                    if (profile.avatarId) {
	                        securityService.refreshToken();
	                        deffered.resolve();
	                    } else {
	                        $timeout(tryToGetAvatar, 400);
	                    }
	                });
	        };

	        tryToGetAvatar();
	        return deffered.promise;
	    };
	    var updateAvatar = function () {
	        return Restangular.one('profiles', securityService.getToken().membershipId).one('avatars').customPOST();
	    };
	    var getProfile = function () {
	        var deffered = $q.defer();
	        var tryToGetProfile = function () {
	            Restangular.one('profiles', securityService.getToken().membershipId).get()
	                .then(function (profile) {
	                    if (profile)
	                        deffered.resolve();
	                    else
	                        $timeout(tryToGetProfile, 400);
	                });
	        };
	        tryToGetProfile();

	        return deffered.promise;
	    };
	    var login = function () {
	        var loginData = $.param({
	            grant_type: 'client_token',
	            provider: vm.provider,
	            token: vm.token
	        });
	        var deffered = $q.defer();
	        var tryToLogin = function () {

	            Restangular.service('auth/tokens').post(loginData).then(function (token) {
	                securityService.storeToken(token);
	                deffered.resolve();
	            }, function () {
	                $timeout(tryToLogin, 400);
	            });
	        };
	        tryToLogin();

	        return deffered.promise;
	    };
	    var register = function () {
	        return Restangular.several('memberships', vm.provider).post({ token: vm.token });
	    };
	    var checkIfMembershipExists = function (helloResponse) {
	        vm.token = helloResponse.authResponse.access_token;
	        var loginData = $.param({
	            grant_type: 'client_token',
	            provider: vm.provider,
	            token: vm.token
	        });

	        return Restangular.service('auth/tokens').post(loginData);
	    };

	    vm.login = function () {
	        hello(vm.provider)
	            .login()
	            .then(function (response) {
	                vm.submitPromise = checkIfMembershipExists(response)
	                    .then(function (token) {
	                        securityService.storeToken(token);
	                        $location.path('/dashboard');
	                        return $q.reject();
	                    }, register)
	                    .then(login)
	                    .then(getProfile)
	                    .then(updateAvatar)
	                    .then(waitForAvatar)
	                    .then(function () {
	                        $location.path('oauthaccountcreated');
	                    });
	            });
	    };
	});
