'use strict';

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
    'restangular',
    'cgNotify',
    'validation.match',
    'LocalStorageModule'
  ])
  .config(function ($routeProvider, $httpProvider, RestangularProvider, ApiConfig, localStorageServiceProvider) {
      $routeProvider
        .when('/', {
            redirectTo: '/start'
        })
        .when('/start', {
            templateUrl: 'views/start.html',
            controller: 'StartCtrl',
            allowAnonymous: true
        })
        .when('/dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardCtrl'
        })
        .when('/projects/:id/pledge', {
            templateUrl: 'views/pledge.html',
            controller: 'PledgeCtrl',
            allowAnonymous: true
        })
        .when('/projects/:projectId/pledges/:id/thanks', {
            templateUrl: 'views/thanks.html',
            controller: 'ThanksCtrl',
            allowAnonymous: true
        })
        .when('/projects/:projectId/pledges/:id/canceled', {
            templateUrl: 'views/canceled.html',
            controller: 'CanceledCtrl',
            allowAnonymous: true
        })
        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileCtrl'
        })
        .when('/projects/:id', {
            templateUrl: 'views/projectdetails.html',
            controller: 'ProjectdetailsCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',
            allowAnonymous: true
        })
        .when('/registeroauth', {
            templateUrl: 'views/registeroauth.html',
            controller: 'RegisterOauthCtrl',
            allowAnonymous: true
        })
        .when('/registerbasic', {
            templateUrl: 'views/registerbasic.html',
            controller: 'RegisterBasicCtrl',
            allowAnonymous: true
        })
        .when('/basicaccountcreated', {
            templateUrl: 'views/basicaccountcreated.html',
            controller: 'BasicAccountCreatedCtrl',
            allowAnonymous: true
        })
        .when('/oauthaccountcreated', {
            templateUrl: 'views/oauthaccountcreated.html',
            controller: 'OauthAccountCreatedCtrl',
            allowAnonymous: true
        })
        .when('/aboutus', {
            templateUrl: 'views/aboutus.html',
            controller: 'AboutusCtrl',
            allowAnonymous: true
        })
        .otherwise({
            redirectTo: '/'
        });
      localStorageServiceProvider.setPrefix('gitcheese');
      localStorageServiceProvider.setStorageCookie();
      $httpProvider.interceptors.push('AuthTokenInterceptor');

      RestangularProvider.setBaseUrl(ApiConfig.address[window.location.hostname]);
  })
  .run(function ($rootScope, $location, $hello, $window, Security, OauthClientIds) {

      $rootScope.$on('$routeChangeStart', function (event, next) {
          if (!!next.$$route.redirectTo || next.allowAnonymous === true) {
              return;
          }

          if (Security.hasAccessToken()) {
              return;
          } else {
              $location.path('/login');
          }
      });

      $rootScope.$on('access_token_removed', function () {
          $location.path('/');
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