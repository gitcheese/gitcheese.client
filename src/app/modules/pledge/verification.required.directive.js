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
                caption: '@',
                profileId: '@'
            }
        };
    });

angular.module('gitcheese.app.pledge')
    .controller('gcVerificationRequiredController', function(Restangular, notify, $scope) {
        var vm = this;
        vm.show = false;
        $scope.$watch('vm.profileId', function(profileId) {
            if (profileId === undefined) {
                return;
            }
            Restangular.one('managedaccounts', profileId).one('verifications').one('pending').get()
                .then(function(pendingVerification) {
                    if (pendingVerification !== undefined) {
                        vm.show = true;
                        vm.url = '#/profiles/' + profileId + '/verifyaccount';
                    }
                });
        });
    });
