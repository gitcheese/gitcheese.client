'use strict';
angular.module('gitcheese.app.security')
    .constant('oauthClientIds', {
        github: {
            'localhost': '2fdbff10bcdf011bd096',
            'gitcheese-staging.azurewebsites.net': '8aed94652b28512c3bb7',
            'www.gitcheese.com': 'ea5846887213a8dbb64a'
        }
    });
