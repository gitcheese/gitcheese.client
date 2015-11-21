"use strict";

angular.module('gitcheese.app.security')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/login', { templateUrl: 'modules/security/login.html', allowAnonymous: true })
            .when('/registerbasic', { templateUrl: 'modules/security/register-basic.html', controller: 'registerBasicController', allowAnonymous: true, controllerAs: 'vm' })
            .when('/registeroauth', { templateUrl: 'modules/security/register-oauth.html', controller: 'registerOauthController', allowAnonymous: true, controllerAs: 'vm' })
            .when('/basicaccountcreated', { templateUrl: 'modules/security/basic-account-created.html', allowAnonymous: true })
            .when('/oauthaccountcreated', { templateUrl: 'modules/security/oauth-account-created.html', allowAnonymous: true })
            .when('/memberships', { templateUrl: 'modules/security/memberships.html', controller: 'membershipsController', controllerAs: 'vm' });
    });
