'use strict';

angular.module('gitcheese.app.administration')
	.directive('gcProfileAvatar', function () {
	    var directive = {
	        restrict: 'E',
	        templateUrl: 'modules/administration/profile-avatar.directive.html',
	        replace: true,
	        scope: {
	            size: '@',
	            profileId: '@'
	        },
	        controllerAs: 'vm',
	        bindToController: true,
	        controller: 'gcProfileAvatarController'
	    };

	    return directive;
	});

angular.module('gitcheese.app.administration')
	.controller('gcProfileAvatarController', function ($scope, apiConstants, $window) {
	    var vm = this;

	    $scope.$watch('vm.profileId', function () {
	        if (vm.profileId)
	            vm.avatarUrl = apiConstants.address[$window.location.hostname] + '/profiles/' + vm.profileId + '/avatars';
	    });

	    $scope.$on('administration.profile_updated', function () {
	        vm.avatarUrl = apiConstants.address[$window.location.hostname] + '/profiles/' + vm.profileId + '/avatars?' + new Date().toTimeString();
	    });
	});