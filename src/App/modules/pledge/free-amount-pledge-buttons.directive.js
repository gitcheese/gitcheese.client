'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcFreeAmountPledgeButtons', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/free-amount-pledge-buttons.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcFreeAmountPledgeButtonsController',
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcFreeAmountPledgeButtonsController', function (Restangular) {
        var vm = this;
        vm.amount = 50;

        vm.pledge = function () {
            var request = {
                amount: vm.amount
            };

            Restangular.one('projects', vm.projectId).post('pledges', request)
                .then(function (success) {
                    $window.location.href = 'https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_ap-payment&paykey=' + success;
                });
        };
    });