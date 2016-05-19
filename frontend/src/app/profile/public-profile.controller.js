(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('PublicProfileController', PublicProfileController);

  /** @ngInject */
  function PublicProfileController(user, ENV, $document, $stateParams, $window, account, $mdDialog) {
    var vm = this;

    vm.userId = $stateParams.userId;
    vm.imageServer = ENV.imageServer;
    vm.user = {interests_list:[]};

    vm.is_public = true;

    user.getUser(vm.userId)
    .then(function(user_data) {
      vm.user = user_data;
      vm.is_complete = (user_data.name && user_data.lastname && user_data.email && user_data.birthdate);
      if (vm.user.birthdate) {
        vm.user.birthdate = new Date(vm.user.birthdate);
      }
      vm.creadospormi = $window._.filter(vm.user.winwins, function(winwin) {
        return winwin.user_id == vm.user.user_id; 
      });

      vm.enqueparticipo = $window._.filter(vm.user.winwins, function(winwin) {
        return winwin.user_id != vm.user.user_id; 
      });
    });

    vm.showSeguirDialog = function() {
      $mdDialog.show({
        controller: SeguirController,
        templateUrl: 'app/profile/modal-seguir.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true
      });
    }
  }

  function SeguirController() {

  }

})();
