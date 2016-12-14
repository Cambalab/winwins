(function() {
  'use strict';

  angular
    .module('winwins')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, gettextCatalog, ENV, Analytics, $auth, $state, $mdDialog, $document) {

    var changeLang = function(event, lang) {
      gettextCatalog.setCurrentLanguage(lang);
    };

    // With var, so can destroy it
    var event1 = $rootScope.$on('changeLang', changeLang);

    gettextCatalog.baseLanguage = ENV.baseLang;
    changeLang(null, ENV.defaultLang);

    if(ENV.name !== 'prod') {
      gettextCatalog.debug = true;
      gettextCatalog.debugPrefix = '[Missing]:';
    }

    // On $rootCcope, so we can reference it on templates
    // without setting on controller
    $rootScope.imageServer = ENV.imageServer;
    
    var event4 = $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        $rootScope.containerClass = toState.containerClass;
    });

    $rootScope.loadingFlag = false;
    var event2 = $rootScope.$on('cfpLoadingBar:started', function () {
        $rootScope.loadingFlag = true;
    });
    var event3 = $rootScope.$on('cfpLoadingBar:completed', function () {
        if($rootScope.loadingFlag){
            $rootScope.loadingFlag = false;
        }
    });

    $rootScope.createWinwin = function() {
      $state.go('home.crear-winwin');
      /*if ($auth.isAuthenticated()) {
        $state.go('home.crear-winwin');
      } else {
        $rootScope.returnState = {
          state : 'home.crear-winwin'
        };
        $mdDialog.show({
          controller: 'LoginController',
          controllerAs: 'login',
          templateUrl: 'app/login/login.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true,
        });
      }*/
    }
    
    
  }

})();
