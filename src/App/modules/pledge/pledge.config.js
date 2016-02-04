"use strict";

angular.module('gitcheese.app.pledge')
    .config(function(stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_a5ywnKSYMblMLLVvpd1iJVN6');
    });