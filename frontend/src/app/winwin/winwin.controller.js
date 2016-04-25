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
          
        });


        // $http.get(api_host+'/api/winwins/join/'+$scope.winwin.id).success(function(data) {
        //   $state.go('winwin-joined', {
        //     winwinId: $scope.winwin.id,
        //     winwinName: $scope.winwin.title
        //   }); 
        // });

      } else {
        // $rootScope.returnState = {
        //   state: 'ww-join',
        //   parameters: {
        //       winwinId: $scope.winwin.id
        //   }
        // };
        $state.go('signIn');
      }
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

  function MasDetalleController($scope, winwin) {
    $scope.winwin = winwin;
  }

  function ParticipantesController(){}

})();
