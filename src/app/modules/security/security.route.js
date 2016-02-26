"use strict";

angular.module('gitcheese.app.security')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/oauthaccountcreated', { templateUrl: 'modules/security/oauth-account-created.html', allowAnonymous: true });
    });
