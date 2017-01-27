'use strict';
angular.module('gitcheese.app.stripe')
    .directive('gcFirstStageVerificationEditor', function() {
        return {
            replace: true,
            templateUrl: 'modules/stripe/first-stage-verification-editor.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcFirstStageVerificationEditorController',
            scope: {
                profileId: '@'
            }
        };
    });
angular.module('gitcheese.app.stripe')
    .controller('gcFirstStageVerificationEditorController', function(Restangular, $location, notify) {
        var vm = this;
        vm.submitCountry = function() {
            
        };
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
                }, function(response) {
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
