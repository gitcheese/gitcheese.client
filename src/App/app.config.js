"use strict";

angular.module('gitcheese.app')
    .config(function ($httpProvider, RestangularProvider, apiConstants, localStorageServiceProvider, cfpLoadingBarProvider) {
        localStorageServiceProvider.setPrefix('gitcheese');
        localStorageServiceProvider.setStorageCookie();
        cfpLoadingBarProvider.includeSpinner = false;

        RestangularProvider.setBaseUrl(apiConstants.address[window.location.hostname]);
    });