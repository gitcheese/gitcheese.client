'use strict';

angular.module('gitcheese.app.security')
    .config(function($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'modules/security/login.html',
                allowAnonymous: true
            })
            .when('/oauthaccountcreated', {
                templateUrl: 'modules/security/oauth-account-created.html',
                allowAnonymous: true
            });
    });
