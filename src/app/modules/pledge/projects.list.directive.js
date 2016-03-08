
'use strict';

angular.module('gitcheese.app.pledge')
    .directive('gcProjectsList', function() {
        return {
            replace: true,
            templateUrl: 'modules/pledge/projects.list.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcProjectsListController',
            scope: {
                caption: '@'
            }
        };
    });

angular.module('gitcheese.app.pledge')
    .controller('gcProjectsListController', function(Restangular, notify) {
        var vm = this;
        Restangular.all('projects').getList({
            $orderby: 'Name'
        }).then(function(projects) {
            vm.projects = projects;
        });

        vm.refetch = function() {
            vm.refetchPromise = Restangular.all('projects').customPUT().then(function() {
                notify({
                    message: 'Your projects list will be updated pretty soon. Please refresh or come back in a minute.',
                    classes: 'alert alert-success'
                });
            });
        };
    });
