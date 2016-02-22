angular.module('gitcheese.app')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
                allowAnonymous: true
            }).otherwise({
		        redirectTo: '/'
		    });
    });