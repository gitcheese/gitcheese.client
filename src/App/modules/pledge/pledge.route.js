angular.module('gitcheese.app.pledge')
    .config(function ($routeProvider) {
        $routeProvider
            .when('/projects/:id/details', { templateUrl: 'modules/pledge/projects-details.html' });
    });