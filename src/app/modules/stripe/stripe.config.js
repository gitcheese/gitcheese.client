"use strict";

angular.module('gitcheese.app.stripe')
    .config(function(stripeProvider) {
        stripeProvider.setPublishableKey('#{stripe_public_key}');
    });
