(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('NotificationsController', NotificationsController);

  /** @ngInject */
  function NotificationsController(account, user, $window) {
    var vm = this;

    account.getProfile()
    .then(function(data) {
      user.getUser(data.user.id)
      .then(function(user_data) {
        vm.notifications = $window._.sortBy(user_data.notifications, function(notification) {
          return -notification.id; 
        });
      });
    });
  }

})();