'use strict';

angular.module('gitcheese.app.stripe')
    .config(function($routeProvider) {
        $routeProvider
            .when('/managedaccounts/:id/verifications/1/details', {
                templateUrl: 'modules/stripe/first-stage-verification-details.html'
            });
    });
