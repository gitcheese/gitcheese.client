'use strict';

angular.module('gitcheeseApp')
	.controller('LoginCtrl', function ($scope, $hello, $location, notify, Restangular, Security) {

	    $scope.oauthLogin = function (provider) {
	        $hello(provider).login().then(function (response) {
	            $scope.logging = true;
	            var data = {
	                grant_type: 'client_token',
	                provider: response.authResponse.network,
	                token: response.authResponse.access_token
	            };
	            Security.storeOauthRegistrationData(data.provider, data.token);

	            Restangular.service('auth/tokens').post($.param(data)).then(function (success) {
	                Security.storeAccessToken(success);
	                $location.path('/dashboard');
	            }, function () {
	                $location.path('/registeroauth');
	            });
	        });
	    };

	    $scope.basicLogin = function () {
	        $scope.logging = true;
	        var data = {
	            grant_type: 'password',
	            username: $scope.login.email,
	            password: $scope.login.password
	        };

	        Restangular.service('auth/tokens').post($.param(data)).then(function (success) {
	            Security.storeAccessToken(success);
	            $location.path('/dashboard');
	        }, function () {
	            $scope.logging = false;
	            notify({
	                message: 'Invalid email or password.',
	                classes: 'alert-danger'
	            });
	        });
	    };

	    $scope.basicRegistration = function () {
	        Restangular.one('accounts', $scope.register.email).customGET('exists').then(function (result) {
	            if (result === true) {
	                notify({
	                    message: 'Email is allready in use.',
	                    classes: 'alert-danger'
	                });
	            } else {
	                Security.storeBasicRegistrationData($scope.register.email, $scope.register.password);
	                $location.path('/registerbasic');
	            }
	        });
	    };
	});