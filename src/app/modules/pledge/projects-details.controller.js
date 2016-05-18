'use strict';

angular.module('gitcheese.app.pledge')
    .controller('projectsDetailsController', function(facebookPixelService) {
        facebookPixelService.track('ViewContent', {
            content_name: 'ProjectDetails'
        });
    });
