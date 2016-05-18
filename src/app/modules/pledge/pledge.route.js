
angular.module('gitcheese.app.pledge')
    .config(function($routeProvider) {
        $routeProvider
            .when('/projects/:id/details', {
                templateUrl: 'modules/pledge/projects-details.html',
                controller: 'projectsDetailsController'
            })
            .when('/projects/:projectId/pledges/:id/confirmed', {
                templateUrl: 'modules/pledge/pledges-confirmed.html',
                allowAnonymous: true
            })
            .when('/projects/:id/pledges/create', {
                templateUrl: 'modules/pledge/pledges-create.html',
                allowAnonymous: true
            });
    });
