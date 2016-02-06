'use strict';

angular.module('gitcheese.app.pledge')
	.directive('gcPledgePayment', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/pledge/pledge-payment.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcPledgePaymentController',
	        scope: {
	            projectId: '@'
	        }
	    };
	});

angular.module('gitcheese.app.pledge')
    .controller('gcPledgePaymentController', function (Restangular, stripe, notify, $location) {
        var vm = this;
        vm.amount = 100;
        vm.ccTypeToClass = {
            "American Express": "fa-cc-amex",
            "Visa": "fa-cc-visa",
            "MasterCard": "fa-cc-mastercard",
            "Diners Club": "fa-cc-diners-club",
            "Discover": "fa-cc-discover",
            "JCB": "fa-cc-jvb"
        }
        vm.initiate = function () {
            vm.initiatePromise = stripe.card.createToken(angular.copy(vm.card))
              .then(function (response) {
                  vm.token = response.id;
              })
              .catch(function (err) {
                  notify({ message: err.message, classes: 'alert alert-danger' });
              });
        };

        vm.pledge = function () {
            vm.pledgePromise = Restangular.one('projects', vm.projectId).post('stripepledges', { token: vm.token, amount: vm.amount })
                .then(function (pledgeId) {
                    $location.path('/projects/' + vm.projectId + '/pledges/' + pledgeId + '/confirmed');
                })
                .catch(function () {
                    notify({ message: 'Unknown error :(', classes: 'alert alert-danger' });
                });
        }

        vm.change = function () {
            vm.token = null;
        }
    });