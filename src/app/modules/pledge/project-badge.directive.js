
'use strict';

angular.module('gitcheese.app.pledge')
    .directive('gcProjectBadge', function() {
        return {
            replace: true,
            templateUrl: 'modules/pledge/project-badge.directive.html',
            controllerAs: 'vm',
            bindToController: true,
            controller: 'gcProjectBadgeController',
            scope: {
                projectId: '@',
                type: '@'
            }
        };
    });

angular.module('gitcheese.app.pledge')
    .controller('gcProjectBadgeController', function(apiConstants, appConstants, $window, $scope) {
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
