'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcPredefinedAmountPledgeButtons', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/predefined-amount-pledge-buttons.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcPredefinedAmountPledgeButtonsController',
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcPredefinedAmountPledgeButtonsController', function (Restangular, $window) {
        var vm = this;
        vm.predefinedAmounts = [1, 2, 5, 10, 20];

        vm.pledge = function (amount) {
            var request = {
                amount: amount
            };

            Restangular.one('projects', vm.projectId).post('pledges', request)
                .then(function (success) {
                    $window.location.href = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=' + success;
                });
        };
    });