'use strict';

angular.module('gitcheese.app')
    .service('contextService', function ($rootScope) {
        $rootScope.context = this;
    });