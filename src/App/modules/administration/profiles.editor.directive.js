'use strict';

angular.module('gitcheese.app.administration')
	.directive('gcProfilesEditor', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/administration/profiles.editor.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProfilesEditorController',
	        scope: true
	    };
	});

angular.module('gitcheese.app.administration')
    .controller('gcProfilesEditorController', function (Restangular, $location, contextService) {
        var vm = this;

        Restangular.one('profiles', contextService.profile.id).get()
            .then(function (profile) {
                vm.profile = profile;
            });

        vm.save = function () {
            vm.profile.put()
                .then(function () {
                    $location.path('/dashboard');
                });
        };
    });