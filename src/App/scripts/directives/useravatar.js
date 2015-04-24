'use strict';

angular.module('gitcheeseApp')
	.directive('userAvatar', function (ApiConfig, $window) {
	    return {
	        restrict: 'E',
	        template: '<img src="{{avatarUrl}}" class="avatar avatar-{{size}} img-circle" />',
	        replace: true,
	        scope: {
	            size: '@',
	            userId: '='
	        },
	        controller: function ($scope, $element) {
	            $scope.$watch('userId', function (userId) {
	                $scope.avatarUrl = ApiConfig.address[$window.location.hostname] + '/users/' + userId + '/avatars';
	            });
	        }
	    };
	});