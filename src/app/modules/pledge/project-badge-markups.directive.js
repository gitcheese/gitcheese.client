
'use strict';

angular.module('gitcheese.app.pledge')
    .directive('gcProjectBadgeMarkups', function() {
        return {
            replace: true,
            templateUrl: 'modules/pledge/project-badge-markups.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcProjectBadgeMarkupsController',
            scope: {
                projectId: '@',
                type: '@'
            }
        };
    });

angular.module('gitcheese.app.pledge')
    .controller('gcProjectBadgeMarkupsController', function(apiConstants, appConstants, $window, $scope) {
        var vm = this;
        vm.pledgeUrl = $window.location.origin + appConstants.addressPostfix[$window.location.hostname] + '/#/projects/' + vm.projectId + '/pledges/create';
        $scope.$watch('vm.type', function(type) {
            if (!type || type === '0') {
                vm.badgeUrl = apiConstants.address[$window.location.hostname] + '/projects/' + vm.projectId + '/badges';
            } else {
                vm.badgeUrl = apiConstants.address[$window.location.hostname] + '/projects/' + vm.projectId + '/badges?type=' + vm.type;
            }
        });
    });
