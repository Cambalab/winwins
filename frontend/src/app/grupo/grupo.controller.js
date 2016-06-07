(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('GrupoListController', GrupoListController);

  /** @ngInject */
  function GrupoListController(ENV, grupo) {
    var vm = this;

    vm.imageServer = ENV.imageServer;

    grupo.getList(0, 15).then(function(data) {
      vm.grupos = data;
    });

  }

})();
