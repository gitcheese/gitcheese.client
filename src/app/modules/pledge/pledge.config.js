"use strict";

angular.module('gitcheese.app.pledge')
    .config(function(stripeProvider) {
        stripeProvider.setPublishableKey('#{stripe_public_key}');
    });
