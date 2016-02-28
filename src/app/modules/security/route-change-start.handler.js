'use strict';

angular.module('gitcheese.app.security')
    .service('routeChangeStart', function ($rootScope, $location, securityService) {
        this.subscribe = function () {
            $rootScope.$on('$routeChangeStart', function (event, next) {
                if (!next.$$route || !!next.$$route.redirectTo || next.allowAnonymous === true) {
                    return;
                }

                if (securityService.hasAccessToken()) {
                    return;
                } else {
                    $location.path('/login');
                }
            });
        };
    });
