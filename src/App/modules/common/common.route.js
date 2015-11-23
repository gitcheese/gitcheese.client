angular.module('gitcheese.app.common')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/dashboard', { templateUrl: 'modules/common/dashboard.html' });
    });