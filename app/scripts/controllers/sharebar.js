'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:SharebarCtrl
 * @description
 * # SharebarCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('SharebarCtrl', function($scope, $window, OauthClientIds) {

		var url = 'http://www.gitcheese.com';

		$scope.facebook = function() {
			var shareUrl = 'https://www.facebook.com/dialog/share?app_id=';
			shareUrl += OauthClientIds.facebook[$window.location.hostname];
			shareUrl += '&display=' + 'popup';
			shareUrl += '&href=' + escape(url);
			shareUrl += '&redirect_uri=' + escape(url);
			openShareWindow(shareUrl);
		};

		$scope.google = function() {
			var shareUrl = 'https://plus.google.com/share?url=' + escape(url);
			openShareWindow(shareUrl);
		};

		$scope.twitter = function() {
			var shareUrl = 'https://twitter.com/share?url=' + escape(url);
			openShareWindow(shareUrl);
		}

		$scope.linkedin = function() {
			var shareUrl = 'https://www.linkedin.com/shareArticle?mini=true&url=' + escape(url);
			shareUrl += '&title=GitCheese';
			shareUrl += '&summary=' + escape('Make some Cheese from Your Git!');
			openShareWindow(shareUrl);
		};

		var openShareWindow = function(data) {
			$window.open(data, 'Share', 'height=800,width=700');
		};
	});