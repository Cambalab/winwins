(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MiembrosController', MiembrosController);

  /** @ngInject */
  function MiembrosController(miembro) {
    var vm = this;

    vm.current_page = 0

    miembro.getList(vm.current_page, 24).then(function(data) {
      vm.miembros = data;
    });

    vm.nextPage = function() {
      vm.current_page = vm.current_page + 1;
      
      miembro.getList(vm.current_page, 24).then(function(data) {
        vm.miembros.push.apply(vm.miembros, data);
      });
    }
  }

})();
