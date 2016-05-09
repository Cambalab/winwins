(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('NotificationController', NotificationController);

  /** @ngInject */
  function NotificationController(notifications) {
    var vm = this;

    vm.notifications = notifications;
  }

})();
