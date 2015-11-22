'use strict';

angular.module('gitcheese.app.security')
	.directive('gcBasicRegistration', function () {
	    var directive = {
	        templateUrl: 'modules/security/basic-registration.directive.html',
	        controller: 'gcBasicRegistrationController',
	        bindToController: true,
	        controllerAs: 'vm',
	        scope: {}
	    };

	    return directive;
	});

angular.module('gitcheese.app.security')
	.controller('gcBasicRegistrationController', function (securityService, $location, notify, Restangular, $timeout, $q) {
	    var vm = this;

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
	        }

	        tryToGetAvatar();
	        return deffered.promise;
	    }
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
	            grant_type: 'password',
	            username: vm.username,
	            password: vm.password
	        });
	        var deffered = $q.defer();
	        var tryToLogin = function () {
	            Restangular.service('auth/tokens').post(loginData)
                    .then(function (token) {
                        securityService.storeToken(token);
                        deffered.resolve();
                    }, function () {
                        $timeout(tryToLogin, 400);
                    });
	        }
	        tryToLogin();

	        return deffered.promise;
	    };
	    var startRegistration = function () {
	        return Restangular.service('memberships').post({ email: vm.username, password: vm.password });
	    }

	    vm.register = function () {
	        vm.submitPromise = Restangular.one('memberships', vm.username).customGET('exists')
	            .then(function (result) {
	                if (result === true) {
	                    notify({
	                        message: 'E-mail jest już zajęty.',
	                        classes: 'alert alert-danger'
	                    });
	                } else {
	                    return;
	                }
	            })
	            .then(startRegistration)
	            .then(login)
	            .then(getProfile)
	            .then(updateAvatar)
	            .then(waitForAvatar)
	            .then(function () {
	                $location.path('basicaccountcreated');
	            });
	    };
	});