(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('MisWinwinController', MisWinwinController);

  /** @ngInject */
  function MisWinwinController(winwin, gettextCatalog, gettext, account, user, $window) {
    var vm = this;

    account.getProfile()
    .then(function(data) {
      vm.account = data;
      
      user.getUser(data.user.id)
      .then(function(user_data) {
        vm.user_detail = user_data;

        vm.creadospormi = $window._.filter(vm.user_detail.winwins, function(winwin) {
          return winwin.user_id == vm.account.user.id; 
        });

        vm.enqueparticipo = $window._.filter(vm.user_detail.winwins, function(winwin) {
          return winwin.user_id != vm.account.user.id; 
        });
      });
    });

    vm.tcreadospormi = gettextCatalog.getString(gettext('Creados por mi'));
    vm.tenqueparticipo = gettextCatalog.getString(gettext('En que participo'));
  }

})();