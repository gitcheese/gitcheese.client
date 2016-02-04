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
    .controller('gcPredefinedAmountPledgeButtonsController', function (Restangular, stripe, notify) {
        var vm = this;
        vm.amount = 100;

        vm.pledge = function () {
            return stripe.card.createToken(angular.copy(vm.card))
              .then(function (response) {
                  return Restangular.one('projects', vm.projectId).post('stripepledges', { token: response.id, amount: vm.amount });
              })
              .then(function () {
                  notify({ message: "Your Pledge is successfully processed!", classes: 'alert alert-success' });
              })
              .catch(function (err) {
                  if (err.type && /^Stripe/.test(err.type)) {
                      notify({ message: err.message, classes: 'alert alert-danger' });
                  }
                  else {
                      notify({ message: 'Unknown error :(', classes: 'alert alert-danger' });
                  }
              });
        };
    });