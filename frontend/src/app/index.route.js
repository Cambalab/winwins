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
        containerClass: 'back-color',
        views: {
          'content@home': {
            templateUrl: 'app/profile/public-profile.html',
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
      .state('home.contact',{
        url: 'contact',
        views: {
          'content@home': {
            templateUrl: 'app/contact/contact.html',
            controller: 'ContactController',
            controllerAs: 'contact'
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
      .state('home.about',{
        url: 'about',
        containerClass: 'back-color',
        views: {
          'content@home': {
            templateUrl: 'app/about/about.html',
            controller: 'AboutController',
            controllerAs: 'about'
          }
        }
      })
      .state('home.weare',{
        url: 'weare',
        containerClass: 'back-color',
        views: {
          'content@home': {
            templateUrl: 'app/weare/weare.html',
            controller: 'WeareController',
            controllerAs: 'weare'
          }
        }
      })
      .state('home.winwin-list',{
        url: 'winwin-list',
        containerClass: 'back-color',
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
      .state('home.mis-grupo-list',{
        url: 'mis-grupos-list',
        views: {
          'content@home': {
            templateUrl: 'app/grupo/group_list_index.html',
            controller: 'MisGruposListController',
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
      .state('home.grupo-creacion',{
        url: 'crear-grupo',
        views: {
          'content@home': {
            templateUrl: 'app/grupo/crear-grupo.html',
            controller: 'CrearGrupoController',
            controllerAs: 'grupo'
          }
        }
      })
      .state('home.miembros',{
        url: 'miembros',
        views: {
          'content@home': {
            templateUrl: 'app/miembros/miembros.html',
            controller: 'MiembrosController',
            controllerAs: 'miembros'
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
      })
      .state('home.search',{
        url: 'search/:query',
        views: {
          'content@home': {
            templateUrl: 'app/search/search.html',
            controller: 'SearchController',
            controllerAs: 'search'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
