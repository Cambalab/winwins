(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('ContactController', ContactController);

  /** @ngInject */
  function ContactController(user, $mdDialog, $state, $document) {
    var vm = this;

    vm.sendMailContact = function() {
      user.sendMailContact(vm.contact).then(function(){
        $state.go('home');

        $mdDialog.show({
          controller: SuccessController,
          templateUrl: 'app/contact/modal_success.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true
        });
      })
    }
  }

  function SuccessController(){
  }

})();
