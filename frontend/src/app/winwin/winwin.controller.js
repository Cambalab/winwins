(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('WinwinController', WinwinController);

  /** @ngInject */
  function WinwinController($stateParams, winwin, ENV, $mdDialog, $document, $sce, account, $auth, $rootScope) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    vm.winwinId = $stateParams.winwinId;

    vm.post = {};

    account.getProfile().then(function(data) {
       vm.account = data.profile;
    });

    winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
      vm.winwin = winwin_data;
      vm.winwin.closing_date = new Date(vm.winwin.closing_date);
      vm.sponsors = _.filter(vm.winwin.sponsors, function(model) {
        return model.pivot.ww_accept == 1 && model.pivot.sponsor_accept == 1;
      });

      vm.post = {reference_id: winwin_data.id, type: 'WINWIN'}
    });

    winwin.getPosts(vm.winwinId).then(function(posts_data) {
      vm.posts = posts_data.posts;
    });

    vm.submitPost = function() {
      winwin.createPost(vm.post)
      .then(function(data){
        if (!vm.winwin.published && !vm.winwin.canceled) {
          winwin.activate(vm.winwinId).then(function() {
            vm.winwin.published = true;
          });
        }

        winwin.getPosts(vm.winwinId).then(function(posts_data) {
          vm.posts = posts_data.posts;
        });
        vm.post = {reference_id: vm.winwinId, type: 'WINWIN'}
      });
    }

    vm.getIframeSrc = function (videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+videoId+'?autoplay=0');
    };

    vm.join = function() {
      if($auth.isAuthenticated()) {
        winwin.join(vm.winwinId).then(function(data) {
          winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
            vm.winwin = winwin_data;
            vm.winwin.closing_date = new Date(vm.winwin.closing_date);
          });
          
          $mdDialog.show({
            controller: ModalConfirmacionSumarseController,
            controllerAs: 'vm',
            templateUrl: 'app/winwin/modal-confirmacion-sumarse.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            locals: {
              current_winwin: vm.winwin
            }
          });
        });
      } else {
        $rootScope.returnState = {
          state: 'home.winwin',
          parameters: {
              winwinId: vm.winwin.id
          }
        };
        $mdDialog.show({
          controller: 'LoginController',
          controllerAs: 'login',
          templateUrl: 'app/login/login.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true
        });
      }
    }

    vm.left = function() {
      $mdDialog.show({
        controller: ModalAbandonarController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-abandonar.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_winwin: vm.winwin
        }
      })
      .then(function(data) {
        winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
          vm.winwin = winwin_data;
          vm.winwin.closing_date = new Date(vm.winwin.closing_date);
        });
      });
    }

    vm.showMasDetalleDialog = function(ev) {
      $mdDialog.show({
        controller: MasDetalleController,
        templateUrl: 'app/winwin/ver-mas-detalle.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          winwin: vm.winwin
        }
      });
    };
    vm.showParticipantesDialog = function(ev) {
      $mdDialog.show({
        controller: ParticipantesController,
        templateUrl: 'app/winwin/participantes.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          users: vm.winwin.users
        }
      });
    };
  }

  /** @ngInject */
  function MasDetalleController($scope, winwin) {
    $scope.winwin = winwin;
  }
  
  /** @ngInject */
  function ParticipantesController($scope, users, ENV){
    $scope.imageServer = ENV.imageServer;
    $scope.users = users;
  }

  angular
    .module('winwins')
    .filter('moment', function(moment) {
      return function(dateString, format) {
        return moment(dateString).format(format);
      };
  });
    
  /** @ngInject */
  function ModalConfirmacionSumarseController($timeout, current_winwin, ENV, winwin) {
    var vm = this;

    vm.base = ENV.base;
    vm.imageServer = ENV.imageServer;
    vm.facebookId = ENV.satellizer.facebook.clientId;
    vm.status = 'success';
    vm.winwin = current_winwin;
    vm.emailsOK = false;

    vm.mails = [];

    $timeout(function() {
      vm.status = 'share';
    }, 3000);

    vm.validateMail = function(chip) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(chip))
      {
        var index = vm.mails.indexOf(chip);
        vm.mails.splice(index, 1);
      }
    }

    vm.sentInvitations = function() {
      winwin.shareMails(vm.winwin.id, vm.mails).then(function() {
        vm.mails = [];
        vm.emailsOK = true;
      });
    }
  }

  /** @ngInject */
  function ModalAbandonarController(current_winwin, $mdDialog, winwin) {
    var vm = this;

    vm.left = function() {
      winwin.left(current_winwin.id).then(function(data) {
         $mdDialog.hide(data);
      });
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    }
  }

})();
