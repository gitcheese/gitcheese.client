'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('ProfileCtrl', function ($scope, $location, Restangular, Context) {

	    Restangular.one('users', 'me').get().then(function (profile) {
	        $scope.profile = profile;
	    });

	    $scope.save = function () {
	        $scope.profile.put().then(function () {
	            Context.refreshCurrentUser();
	            $location.path('/dashboard');
	        });
	    };

	    $scope.saveAvatarUrl = function () {
	        $scope.profile.one('avatars').customPUT({ url: $scope.avatarNewUrl }).then(function () {
	            Context.refreshCurrentUser();
	        });
	    };

	    $scope.generateAvatar = function () {
	        $scope.profile.one('avatars').customPUT({}).then(function () {
	            Context.refreshCurrentUser();
	        });
	    }
	});