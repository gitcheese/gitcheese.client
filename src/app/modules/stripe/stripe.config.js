"use strict";

angular.module('gitcheese.app.stripe')
    .config(function(stripeProvider) {
        stripeProvider.setPublishableKey('pk_test_icwCSxTloCbsT3QvNHL4uumW');
    });
