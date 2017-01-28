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
    .controller('gcFirstStageVerificationEditorController', function(Restangular, $location, notify, stripe) {
        var vm = this;
        vm.countries = [
            { code: 'US', name: 'United States', currency: 'USD' },
            { code: 'AT', name: 'Austria', currency: 'EUR' },
            { code: 'AU', name: 'Australia', currency: 'AUD' },
            { code: 'BE', name: 'Belgium', currency: 'EUR' },
            { code: 'CA', name: 'Canada', currency: 'CAD' },
            { code: 'CH', name: 'Switzerland', currency: 'CHF' },
            { code: 'DE', name: 'Germany', currency: 'EUR' },
            { code: 'DK', name: 'Denmark', currency: 'DKK' },
            { code: 'ES', name: 'Spain', currency: 'EUR' },
            { code: 'FI', name: 'Finland', currency: 'EUR' },
            { code: 'FR', name: 'France', currency: 'EUR' },
            { code: 'GB', name: 'United Kingdom', currency: 'GBP' },
            { code: 'HK', name: 'Hong Kong', currency: 'HKD' },
            { code: 'IE', name: 'Ireland', currency: 'EUR' },
            { code: 'IT', name: 'Italy', currency: 'EUR' },
            { code: 'JP', name: 'Japan', currency: 'JPY' },
            { code: 'LU', name: 'Luxembourg', currency: 'EUR' },
            { code: 'NL', name: 'Netherlands', currency: 'EUR' },
            { code: 'NO', name: 'Norway', currency: 'NOK' },
            { code: 'NZ', name: 'New Zealand', currency: 'NZD' },
            { code: 'PT', name: 'Portugal', currency: 'EUR' },
            { code: 'SE', name: 'Sweden', currency: 'SEK' },
            { code: 'SG', name: 'Singapore', currency: 'SGD' }
        ];
        vm.verify = function() {
            var country = vm.countries.find(function(c) {
                return c.code === vm.bankAccount.country;
            });
            vm.bankAccount.currency = country.currency;
            stripe.bankAccount
                .createToken(vm.bankAccount)
                .then(function(accountTokenResponse) {
                    vm.managedAcct.account_token = accountTokenResponse.id;
                    vm.managedAcct.country = vm.bankAccount.country;
                    return Restangular
                        .one('managedaccounts', vm.profileId)
                        .one('verifications')
                        .one('1')
                        .customPUT(vm.managedAcct);
                }, vm.handleStripeError)
                .then(function() {
                    vm.verified = true;
                    notify({
                        message: 'Verification in process',
                        classes: 'alert alert-success'
                    });
                }, vm.handleStripeError)
                .catch(function() {
                    notify({
                        message: 'Unknown error :(',
                        classes: 'alert alert-danger'
                    });
                });
        };
        vm.handleStripeError = function(response) {
            notify({
                message: response.data.message,
                classes: 'alert alert-danger'
            });
        };
    });
