'use strict';

/**
 * @ngdoc overview
 * @name winwinsApp
 * @description
 * # winwinsApp
 *
 * Main module of the application.
 */
angular
  .module('winwinsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');


    $stateProvider
      .state('main',{
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).state('signUp',{
        url: '/signup',
        templateUrl: 'views/signUp.html',
        controller: 'SignUpCtrl'
      }).state('winwin',{
        url: '/winwin',
        templateUrl: 'views/winwin.html',
        controller: 'WinwinCtrl'
      }).state('createWW',{
        url: '/createww',
        templateUrl: 'views/createWW.html',
        controller: 'CreateWWCtrl'
      }).state('createWWid',{
        url: '/createwwid',
        templateUrl: 'views/createWWid.html',
        controller: 'CreateWWCtrl'
      }).state('signIn',{
        url: '/signin',
        templateUrl: 'views/signIn.html',
        controller: 'SignInCtrl'
      }).state('activateWW',{
        url: '/activate',
        templateUrl: 'views/activateWW.html',
        controller: 'ActivateWWCtrl'
      }).state('promote',{
        url: '/promote',
        templateUrl: 'views/promote.html',
        controller: 'ActivateWWCtrl'
      }).state('members',{
        url: '/members',
        templateUrl: 'views/members.html',
        controller: 'MembersCtrl'
      });;
  });
