(function() {
    'use strict';

    angular
        .module('winwins')
        .controller('MisGruposListController', MisGruposListController);

  /** @ngInject */
  function MisGruposListController(ENV, user) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    user.getGroups().then(function(data) {
      vm.grupos = data;
    });
  }

})();
