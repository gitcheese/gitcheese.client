'use strict';

angular.module('gitcheese.app.security')
	.directive('gcOauthLoginButton', function () {
	    var directive = {
	        templateUrl: 'modules/security/oauth-login-button.directive.html',
	        controller: 'gcOauthLoginButtonController',
	        bindToController: true,
	        controllerAs: 'vm',
	        scope: { provider: '@', size: '@' }
	    };

	    return directive;
	});

angular.module('gitcheese.app.security')
	.controller('gcOauthLoginButtonController', function (securityService, $location, hello, Restangular) {
	    var vm = this;
	    vm.iconSizes = {
	        'lg': 5,
	        'm': 3,
	        'sm': 2,
	        'xs': 1
	    }
	    vm.login = function () {
	        return hello(vm.provider).login().then(function (response) {
	            var data = {
	                grant_type: 'client_token',
	                provider: response.authResponse.network,
	                token: response.authResponse.access_token
	            };
	            securityService.storeOauthRegistrationData(data.provider, data.token);

	            return Restangular.service('auth/tokens').post($.param(data)).then(function (token) {
	                securityService.storeToken(token);
	                $location.path('/home');
	            }, function () {
	                $location.path('/registeroauth');
	            });
	        });
	    };
	});