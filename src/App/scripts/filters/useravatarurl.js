'use strict';

angular.module('gitcheeseApp')
    .filter('userAvatarUrl', function (ApiConfig, $window) {
        return function (userId) {
            return ApiConfig.address[$window.location.hostname] + '/users/' + userId + '/avatars';;
        };
    });