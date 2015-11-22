'use strict';

angular.module('gitcheese.app.security')
	.directive('gcBasicLogin', function () {
	    var directive = {
	        templateUrl: 'modules/security/basic-login.directive.html',
	        controller: 'gcBasicLoginController',
	        bindToController: true,
	        controllerAs: 'vm',
	        scope: {}
	    };

	    return directive;
	});

angular.module('gitcheese.app.security')
	.controller('gcBasicLoginController', function (securityService, $location, notify, Restangular) {
	    var vm = this;
	    vm.login = function () {
	        var data = {
	            grant_type: 'password',
	            username: vm.username,
	            password: vm.password
	        };

	        vm.submitPromise = Restangular.service('auth/tokens').post($.param(data)).then(function (token) {
	            securityService.storeToken(token);
	            $location.path('/home');
	        }, function () {
	            notify({
	                message: 'Niepoprawny e-mail lub hasło.',
	                classes: 'alert alert-danger'
	            });
	        });
	    };
	});