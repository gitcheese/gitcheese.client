'use strict';

/**
 * @ngdoc overview
 * @name gitcheeseApp
 * @description
 * # gitcheeseApp
 *
 * Main module of the application.
 */
angular
  .module('gitcheeseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'hello',
    'restangular'
  ])
  .config(function($routeProvider, $httpProvider, RestangularProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/start'
      })
      .when('/start', {
        templateUrl: 'views/start.html',
        controller: 'StartCtrl',
        allowAnonymous: true
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        allowAnonymous: true
      })
      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .when('/pledge', {
        templateUrl: 'views/pledge.html',
        controller: 'PledgeCtrl'
      })
      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'ProfileCtrl'
      })
      .when('/projectDetails', {
        templateUrl: 'views/projectdetails.html',
        controller: 'ProjectdetailsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        allowAnonymous: true
      })
      .when('/accountCreated', {
        templateUrl: 'views/accountcreated.html',
        controller: 'AccountcreatedCtrl',
        allowAnonymous: true
      })
      .otherwise({
        redirectTo: '/'
      });

    $httpProvider.interceptors.push('AuthTokenInterceptor');

    RestangularProvider.setBaseUrl('http://localhost:8090');
  })
  .run(function($rootScope, $location, $hello, Security) {

    $rootScope.$on('$routeChangeStart', function(event, next) {
      if (!!next.$$route.redirectTo || next.allowAnonymous === true) {
        return;
      }

      if (Security.hasAccessToken()) {
        return;
      } else {
        $location.path('/login');
      }
    });

    $hello.init({
      facebook: '551034988332783',
      github: 'ea5846887213a8dbb64a',
      windows: '0000000044136916'
    }, {
      scope: 'email'
    });
  });