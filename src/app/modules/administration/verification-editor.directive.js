'use strict';

angular.module('gitcheese.app.administration')
	.directive('gcVerificationEditor', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/administration/verification-editor.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcVerificationEditorController',
	        scope: true
	    };
	});

angular.module('gitcheese.app.administration')
    .controller('gcVerificationEditorController', function (Restangular, $location, notify, contextService) {
        var vm = this;

        vm.verify = function () {
            var profileId = contextService.profile.id;

            Restangular
                .one('managedaccounts', profileId)
                .one('verifications')
                .one('1')
                .post(vm.managedAcct)
                .then(function () {
                    notify({ message: 'Verification in process', classes: 'alert alert-success' });
                    $('#verificationBtn').remove();
                })
                .catch(function () {
                    notify({ message: 'Unknown error :(', classes: 'alert alert-danger' });
                });
        };
    });
