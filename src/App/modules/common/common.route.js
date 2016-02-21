angular.module('gitcheese.app.common')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/dashboard', { templateUrl: 'modules/common/dashboard.html' })
            .when('/about-us', { templateUrl: 'modules/common/about-us.html', allowAnonymous: true })
            .when('/terms-of-use', { templateUrl: 'modules/common/terms-of-use.html', allowAnonymous: true });
    });
