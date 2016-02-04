'use strict';

angular.module('gitcheese.app.security')
   .service('securityService', function ($rootScope, localStorageService, $http, Restangular) {
       var tokenStorageKey = 'tokenStorageKey';

       this.init = function () {
           var token = localStorageService.get(tokenStorageKey);
           if (token) {
               this.storeToken(token);
           }
       }

       this.storeToken = function (token) {
           localStorageService.set(tokenStorageKey, token);
           $http.defaults.headers.common['Authorization'] = 'Bearer ' + token.access_token;
           $rootScope.$broadcast('security.token_updated', { membershipId: token.membershipId, organizationId: token.organizationId });
       };

       this.getToken = function () {
           var storageToken = localStorageService.get(tokenStorageKey);

           if (storageToken) {
               var expiresInMiliseconds = storageToken.expires_in * 1000;
               var expirationDateMiliseconds = new Date(storageToken.issueAt).valueOf() + expiresInMiliseconds;
               if (expirationDateMiliseconds <= new Date().valueOf()) {
                   localStorageService.remove(tokenStorageKey);
                   return undefined;
               }
           }
           return storageToken;
       };

       this.refreshToken = function () {
           var that = this;
           var token = localStorageService.get(tokenStorageKey);
           var data = {
               grant_type: 'refresh_token',
               refresh_token: token.refresh_token
           };
           Restangular.one('auth/tokens').customPOST($.param(data))
               .then(function (newToken) {
                   that.storeToken(newToken);
               });
       };

       this.removeToken = function () {
           localStorageService.remove(tokenStorageKey);
           $http.defaults.headers.common['Authorization'] = '';
           $rootScope.$broadcast('security.token_removed');
       };

       this.hasAccessToken = function () {
           var token = this.getToken();
           return token != null && typeof token !== 'undefined' && token.access_token;
       };
   });