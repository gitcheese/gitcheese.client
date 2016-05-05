
'use strict';

angular.module('gitcheese.app.administration')
    .directive('gcProfilesEditor', function() {
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
    .controller('gcProfilesEditorController', function(Restangular, $location, contextService, hello) {
        var vm = this;

        Restangular.one('profiles', contextService.profile.id).get()
            .then(function(profile) {
                vm.profile = profile;
                if (!vm.profile.email) {
                    vm.getGithubEmail();
                }
            });

        vm.save = function() {
            vm.profile.put()
                .then(function() {
                    $location.path('/dashboard');
                });
        };

        vm.getGithubEmail = function() {
            vm.github = hello('github');
            vm.github.login({
                scope: 'email'
            }).then(function() {
                return vm.github.api('/user/emails');
            }).then(function(emails) {
                if (emails && emails.data && emails.data.length > 0) {
                    vm.profile.email = emails.data[0].email;
                }
            });
        };
    });
