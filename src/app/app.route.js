'use strict';

angular.module('gitcheese.app')
    .config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home.html',
            })
            .otherwise({
                redirectTo: '/'
            });
    });
