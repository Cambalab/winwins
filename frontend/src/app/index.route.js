(function() {
  'use strict';

  angular
    .module('winwins')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        views: {
          'master': {
            templateUrl: 'app/master/master.html',
            containerClass: 'home'
          },
          'content@home': {
            templateUrl: 'app/main/main.html',
            controller: 'MainController',
            controllerAs: 'main',
            resolve: {
              partners: function(partner) {
                return partner.getList();
              }
            }
          }
        }
      })
      .state('home.profile',{
        url: 'profile',
        views: {
          'content@home': {
            templateUrl: 'app/profile/profile.html',
            controller: 'ProfileController',
            controllerAs: 'profile'
          }
        }
      })
      .state('home.public-profile',{
        url: 'profile/:userId',
        views: {
          'content@home': {
            templateUrl: 'app/profile/profile.html',
            controller: 'PublicProfileController',
            controllerAs: 'profile'
          }
        }
      })
      .state('home.winwin',{
        url: 'winwin/:winwinId',
        views: {
          'content@home': {
            templateUrl: 'app/winwin/winwin.html',
            controller: 'WinwinController',
            controllerAs: 'winwin'
          }
        }
      })
      .state('home.activacion',{
        url: 'activacion',
        views: {
          'content@home': {
            templateUrl: 'app/profile/activacion.html',
            controller: 'ActivacionController',
            controllerAs: 'activacion'
          }
        }
      })
      .state('home.crear-winwin',{
        url: 'crear-winwin',
        views: {
          'content@home': {
            templateUrl: 'app/winwin/crear-winwin.html',
            controller: 'CrearWinwinController',
            controllerAs: 'winwin'
            }
        }
      })
      .state('home.terms',{
        url: 'terms',
        views: {
          'content@home': {
            templateUrl: 'app/terms/terms.html',
            controller: 'TermsController',
            controllerAs: 'terms'
          }
        }
      })
      .state('home.notifications',{
        url: 'notifications',
        views: {
          'content@home': {
            templateUrl: 'app/notifications/notifications.html',
            controller: 'NotificationsController',
            controllerAs: 'notifications'
          }
        }
      })
      .state('home.winwin-list',{
        url: 'winwin-list',
        views: {
          'content@home': {
            templateUrl: 'app/winwin/winwin-list.html',
            controller: 'WinwinListController',
            controllerAs: 'winwin'
          }
        }
      })
      .state('home.grupo-list',{
        url: 'grupo-list',
        views: {
          'content@home': {
            templateUrl: 'app/grupo/group_list_index.html',
            controller: 'GrupoListController',
            controllerAs: 'grupo'
          }
        }
      })
      .state('home.grupo-profile',{
        url: 'grupo/:groupId',
        views: {
          'content@home': {
            templateUrl: 'app/grupo/grupo-profile.html',
            controller: 'PublicGrupoProfileController',
            controllerAs: 'grupo'
          }
        }
      })
      .state('home.mis-winwin',{
        url: 'mis-winwin',
        views: {
          'content@home': {
            templateUrl: 'app/winwin/mis-winwin.html',
            controller: 'MisWinwinController',
            controllerAs: 'winwin'
            }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
