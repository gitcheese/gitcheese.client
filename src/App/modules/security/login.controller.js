'use strict';

angular.module('gitcheese.app.security')
	.controller('loginController', function ($location, notify, security, Restangular) {
	    var vm = this;

	    vm.basicRegistration = function () {
	        return Restangular.one('memberships', vm.register.email).customGET('exists').then(function (result) {
	            if (result === true) {
	                notify({
	                    message: 'E-mail jest już zajęty.',
	                    classes: 'alert alert-danger'
	                });
	            } else {
	                security.storeBasicRegistrationData(vm.register.email, vm.register.password);
	                $location.path('/registerbasic');
	            }
	        });
	    };
	});