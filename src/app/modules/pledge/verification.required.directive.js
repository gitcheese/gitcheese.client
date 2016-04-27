
'use strict';

angular.module('gitcheese.app.pledge')
    .directive('gcVerificationRequired', function() {
        return {
            replace: true,
            templateUrl: 'modules/pledge/verification.required.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcVerificationRequiredController',
            scope: {
                caption: '@'
            }
        };
    });

angular.module('gitcheese.app.pledge')
    .controller('gcVerificationRequiredController', function(Restangular, notify, contextService) {
        var vm = this;
        vm.hide = true;
        //GET /v1/managedaccounts/{id}/verifications/pending
        Restangular.one('managedaccounts', contextService.profile.id).one('verifications').one('pending').get()
            .then(function(pendingVerification) {
                if(pendingVerification !== undefined) 
                { 
                    vm.hide = false;
                    vm.url = '/#/profiles/' + contextService.profile.id + '/verifyaccount'; 
                }
            });
    });
