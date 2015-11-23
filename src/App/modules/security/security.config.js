"use strict";

angular.module('gitcheese.app.security')
    .config(function () { })
    .run(function (hello, oauthClientIds, $window, routeChangeStart) {

        routeChangeStart.subscribe();

        hello.init({
            facebook: oauthClientIds.facebook[$window.location.hostname],
            github: oauthClientIds.github[$window.location.hostname],
            windows: oauthClientIds.windows[$window.location.hostname],
            twitter: oauthClientIds.twitter[$window.location.hostname],
            google: oauthClientIds.google[$window.location.hostname],
            dropbox: oauthClientIds.dropbox[$window.location.hostname],
            linkedin: oauthClientIds.linkedin[$window.location.hostname]
        }, {
            scope: 'email',
            redirect_uri: 'oauth.html',
        });
    });