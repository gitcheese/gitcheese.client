angular.module('gitcheese.app.administration')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/profiles/:id/details', { templateUrl: 'modules/administration/profiles-details.html' });
    });