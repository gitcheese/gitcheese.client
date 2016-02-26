'use strict';

angular.module('gitcheese.app.layout')
    .directive('gcFooter', function() {
        var directive = {
            templateUrl: 'modules/layout/footer.directive.html',
            controller: 'footerController',
            bindToController: true,
            controllerAs: 'vm',
            replace: true
        };

        return directive;
    });

angular.module('gitcheese.app.layout')
    .controller('footerController', function(oauthClientIds, $window) {
        var vm = this;
        vm.url = 'http://www.gitcheese.com';

        var openShareWindow = function(data) {
            $window.open(data, 'Share', 'height=800,width=700');
        };

        vm.facebook = function() {
            var shareUrl = 'https://www.facebook.com/dialog/share?app_id=';
            shareUrl += oauthClientIds.facebook[$window.location.hostname];
            shareUrl += '&display=' + 'popup';
            shareUrl += '&href=' + escape(url);
            shareUrl += '&redirect_uri=' + escape(url);
            openShareWindow(shareUrl);
        };

        vm.google = function() {
            var shareUrl = 'https://plus.google.com/share?url=' + escape(url);
            openShareWindow(shareUrl);
        };

        vm.twitter = function() {
            var shareUrl = 'https://twitter.com/share?url=' + escape(url);
            openShareWindow(shareUrl);
        }

        vm.linkedin = function() {
            var shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + escape(url);
            shareUrl += '&title=GitCheese';
            shareUrl += '&summary=' + escape('Make some Cheese from Your Git!');
            openShareWindow(shareUrl);
        };
    });
