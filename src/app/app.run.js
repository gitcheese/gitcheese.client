
"use strict";

angular.module('gitcheese.app')
    .run( function($route) {
        $route.reload();
        new WOW().init();
    });
