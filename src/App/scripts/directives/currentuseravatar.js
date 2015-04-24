'use strict';

angular.module('gitcheeseApp')
	.directive('currentUserAvatar', function (Context, ApiConfig, $window) {
	    return {
	        restrict: 'E',
	        template: '<img src="{{avatarUrl}}" class="avatar avatar-{{size}} img-circle" />',
	        replace: true,
	        scope: {
	            size: '@'
	        },
	        controller: function ($scope, $element) {
	            $scope.context = Context;
	            $scope.$watch('context.user', function (newUser) {
	                if (newUser) {
	                    $scope.avatarUrl = ApiConfig.address[$window.location.hostname] + '/users/' + newUser.id + '/avatars?' + new Date().getTime();;
	                }
	            });
	        }
	    };
	});