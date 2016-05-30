(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('NotificationsController', NotificationsController);

  /** @ngInject */
  function NotificationsController(notifications, $mdDialog, current_user, account, $rootScope) {
    var vm = this;

    account.notificactionsRed(current_user).then(function() {
      $rootScope.$broadcast('account_change');
    });

    vm.notifications = notifications

    vm.close = function() {
      $mdDialog.cancel();
    }
  }

})();