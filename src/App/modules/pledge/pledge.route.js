angular.module('gitcheese.app.pledge')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/projects/:id/details', { templateUrl: 'modules/pledge/projects-details.html' })
            .when('/projects/:projectId/pledges/:id/confirmed', { templateUrl: 'modules/pledge/pledges-confirmed.html' })
            .when('/projects/:projectId/pledges/:id/canceled', { templateUrl: 'modules/pledge/pledges-canceled.html' })
            .when('/projects/:id/pledges/create', { templateUrl: 'modules/pledge/pledges-create.html' });
    });