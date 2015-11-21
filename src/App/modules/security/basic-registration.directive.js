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
	.controller('gcBasicRegistrationController', function (securityService, $location, notify, Restangular, $timeout) {
	    var vm = this;

	    var waitForAvatar = function () {
	        Restangular.one('profiles', securityService.getToken().membershipId).get()
                .then(function (profile) {
                    if (profile.avatarId) {
                        securityService.refreshToken();
                        $location.path('basicaccountcreated');
                    } else {
                        $timeout(waitForAvatar, 400);
                    }
                });
	    }
	    var updateAvatar = function () {
	        Restangular.one('profiles', securityService.getToken().membershipId).one('avatars').customPOST()
                .then(function () {
                    waitForAvatar();
                });
	    };
	    var getProfile = function () {
	        Restangular.one('profiles', securityService.getToken().membershipId).get()
                .then(function () {
                    updateAvatar();
                }, function () {
                    $timeout(getProfile, 400);
                });
	    };
	    var login = function (username, password) {
	        var loginData = $.param({
	            grant_type: 'password',
	            username: username,
	            password: password
	        });

	        vm.completing = true;
	        Restangular.service('auth/tokens').post(loginData).then(function (token) {
	            securityService.storeToken(token);
	            getProfile();
	        }, function () {
	            $timeout(login, 400);
	        });
	    };
	    var startRegistration = function (username, password) {
	        vm.registering = true;
	        Restangular.service('memberships').post({ email: username, password: password }).then(function () {
	            vm.registering = false;
	            login(username, password);
	        });
	    }

	    vm.register = function () {
	        return Restangular.one('memberships', vm.username).customGET('exists').then(function (result) {
	            if (result === true) {
	                notify({
	                    message: 'E-mail jest już zajęty.',
	                    classes: 'alert alert-danger'
	                });
	            } else {
	                startRegistration(vm.username, vm.password);
	            }
	        });
	    };
	});