
'use strict';

angular.module('gitcheese.app.administration')
    .directive('gcVerificationEditor', function() {
        return {
            replace: true,
            templateUrl: 'modules/administration/verification-editor.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcVerificationEditorController',
            scope: {
                profileId: '@'
            }
        };
    });

angular.module('gitcheese.app.administration')
    .controller('gcVerificationEditorController', function(Restangular, $location, notify) {
        var vm = this;

        vm.verify = function() {
            Restangular
                .one('managedaccounts', vm.profileId)
                .one('verifications')
                .one('1')
                .customPUT(vm.managedAcct)
                .then(function() {
                    vm.verified = true;
                    notify({
                        message: 'Verification in process',
                        classes: 'alert alert-success'
                    });
                },function(response){
									notify({
											message: response.data.message,
											classes: 'alert alert-danger'
									});
								})
                .catch(function() {
									notify({
											message: 'Unknown error :(',
											classes: 'alert alert-danger'
									});
                });
        };
    });
