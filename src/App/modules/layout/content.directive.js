'use strict';

angular.module('gitcheese.app.layout')
    .directive('gcContent', function() {
        var directive = {
            templateUrl: 'modules/layout/content.directive.html',
            controller: 'contentController',
            bindToController: true,
            controllerAs: 'vm',
            scope: true
        };

        return directive;
    });

angular.module('gitcheese.app.layout')
    .controller('contentController', function($rootScope, $location) {
        var vm = this;

        vm.landingPage = $location.path() === '/' || $location.path() === '';

        $rootScope.$on('$routeChangeSuccess', function(e, current) {
            vm.landingPage = current.$$route.originalPath === '/' || current.$$route.originalPath === '';
        });
    });
