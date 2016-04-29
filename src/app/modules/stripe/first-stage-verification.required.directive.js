'use strict';

angular.module('gitcheese.app.stripe')
    .directive('gcFirstStageVerificationRequired', function() {
        return {
            replace: true,
            templateUrl: 'modules/stripe/first-stage-verification.required.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcFirstStageVerificationRequiredController',
            scope: {
                profileId: '@'
            }
        };
    });

angular.module('gitcheese.app.stripe')
    .controller('gcFirstStageVerificationRequiredController', function(Restangular, notify, $scope) {
        var vm = this;
        vm.show = false;
        $scope.$watch('vm.profileId', function(profileId) {
            if (profileId === undefined) {
                return;
            }
            Restangular.one('managedaccounts', profileId).one('verifications').one('pending').get()
                .then(function(pendingVerification) {
                    vm.show = pendingVerification !== undefined;
                });
        });
    });
