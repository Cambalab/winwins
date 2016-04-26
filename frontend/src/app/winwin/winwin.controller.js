(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('WinwinController', WinwinController);

  /** @ngInject */
  function WinwinController($stateParams, winwin, ENV, $mdDialog, $document, $auth) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    vm.winwinId = $stateParams.winwinId;

    winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
      vm.winwin = winwin_data;
      vm.winwin.closing_date = new Date(vm.winwin.closing_date);
    });

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
        // $rootScope.returnState = {
        //   state: 'ww-join',
        //   parameters: {
        //       winwinId: $scope.winwin.id
        //   }
        // };
        //$state.go('signIn');
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
        clickOutsideToClose:true
      });
    };
  }

  /** @ngInject */
  function MasDetalleController($scope, winwin) {
    $scope.winwin = winwin;
  }

  function ParticipantesController(){}

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
