angular.module('gitcheese.app.administration')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/profiles/:id/details', { templateUrl: 'modules/administration/profiles-details.html' })
            .when('/profiles/:id/verifyaccount', { templateUrl: 'modules/administration/verification-details.html' });
    });
