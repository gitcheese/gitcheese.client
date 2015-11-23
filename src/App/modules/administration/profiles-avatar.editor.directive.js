'use strict';

angular.module('gitcheese.app.administration')
	.directive('gcProfilesAvatarEditor', function () {
	    return {
	        replace: true,
	        templateUrl: 'modules/administration/profiles-avatar.editor.directive.html',
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProfilesAvatarEditorController',
	        scope: true
	    };
	});

angular.module('gitcheese.app.administration')
    .controller('gcProfilesAvatarEditorController', function (Restangular, securityService, contextService) {
        var vm = this;

        vm.saveUrl = function () {
            Restangular.one('profiles', contextService.profile.id).one('avatars').customPUT({ url: vm.newUrl })
                .then(function () {
                    securityService.refreshToken();
                });
        };

        vm.generate = function () {
            Restangular.one('profiles', contextService.profile.id).one('avatars').customPUT({})
                .then(function () {
                    securityService.refreshToken();
                });
        }
    });