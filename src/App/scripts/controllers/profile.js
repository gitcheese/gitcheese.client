'use strict';

/**
 * @ngdoc function
 * @name gitcheeseApp.controller:ProfileCtrl
 * @description
 * # ProfileCtrl
 * Controller of the gitcheeseApp
 */
angular.module('gitcheeseApp')
	.controller('ProfileCtrl', function ($scope, $location, $hello, $window, Restangular, ApiConfig, notify) {

	    Restangular.one('users', 'me').get().then(function (profile) {
	        $scope.profile = profile;
	    });

	    $scope.save = function () {
	        $scope.profile.put().then(function () {
	            $location.path('/dashboard');
	        });
	    };

	    $scope.saveAvatarUrl = function () {
	        $scope.profile.one('avatars').customPUT({ url: $scope.avatarNewUrl }).then(function () {
	            notify({
	                message: 'Your new avatar is beeing saved. It will update preety soon.',
	                classes: 'alert-success'
	            });
	        });
	    };

	    $scope.generateAvatar = function () {
	        $scope.profile.one('avatars').customPUT({}).then(function () {
	            notify({
	                message: 'Your new avatar is beeing gnerated. It will update preety soon.',
	                classes: 'alert-success'
	            });
	        });
	    }
	});