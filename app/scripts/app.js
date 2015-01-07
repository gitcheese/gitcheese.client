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
    'gitcheeseApp.config',
    'restangular'
  ])
  .config(function($routeProvider, $httpProvider, RestangularProvider, ApiConfig) {
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

    RestangularProvider.setBaseUrl(ApiConfig.address[window.location.hostname]);
  })
  .run(function($rootScope, $location, $hello, $window, Security, OauthClientIds) {

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
      facebook: OauthClientIds.facebook[$window.location.hostname],
      github: OauthClientIds.github[$window.location.hostname],
      windows: OauthClientIds.windows[$window.location.hostname],
      twitter: OauthClientIds.twitter[$window.location.hostname],
      google: OauthClientIds.google[$window.location.hostname],
      dropbox: OauthClientIds.dropbox[$window.location.hostname],
      linkedin: OauthClientIds.linkedin[$window.location.hostname]
    }, {
      scope: 'email',
      redirect_uri: 'oauth.html',
    });
  });