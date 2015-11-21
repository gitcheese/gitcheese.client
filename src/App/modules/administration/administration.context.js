'use strict';

angular.module('gitcheese.app.administration')
	.run(function ($rootScope, contextService, Restangular) {
	    $rootScope.$on('security.token_updated', function (event, data) {
	        Restangular.one('profiles', data.membershipId).get()
                .then(function (profile) {
                    contextService.profile = profile;
                });
	    });

	    $rootScope.$on('security.token_removed', function () {
	        contextService.profile = null;
	    });
	});