angular.module('gitcheese.app.common')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/dashboard', { templateUrl: 'modules/common/dashboard.html' })
            .when('/about-us', { templateUrl: 'modules/common/about-us.html' });
    });