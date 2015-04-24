'use strict';

angular.module('gitcheeseApp')
	.service('Context', function ($rootScope, Restangular) {
	    var that = this;
	    this.user;

	    this.refreshCurrentUser = function () {
	        Restangular.one('users', 'me').get().then(function (profile) {
	            that.user = profile;
	        });
	    };

	    this.removeCurrentUser = function () {
	        delete that.user;
	    };

	    $rootScope.$on('access_token_removed', function () {
	        that.removeCurrentUser();
	    });

	    $rootScope.$on('access_token_stored', function () {
	        that.refreshCurrentUser();
	    });
	});