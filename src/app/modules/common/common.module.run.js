angular.module('gitcheese.app.common')
    .run(function(facebookPixelService) {
        facebookPixelService.init();
    });
