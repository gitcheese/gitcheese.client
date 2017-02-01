'use strict';
angular.module('gitcheese.app')
    .constant('appConstants', {
        addressPostfix: {
            'localhost': '',
            'www.gitcheese.com': '/app',
            'gitcheese-staging.azurewebsites.net': '/app'
        }
    })
    .constant('apiConstants', {
        address: {
            'localhost': 'https://gitcheese-api-staging.apphb.com/v1',
            'www.gitcheese.com': 'https://api.gitcheese.com/v1',
            'gitcheese-staging.azurewebsites.net': 'https://gitcheese-api-staging.apphb.com'
        }
    });
