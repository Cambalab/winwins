(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('NotificationsController', NotificationsController);

  /** @ngInject */
  function NotificationsController(notifications, $mdDialog) {
    var vm = this;

    vm.notifications = notifications

    vm.close = function() {
      $mdDialog.cancel();
    }
  }

})();