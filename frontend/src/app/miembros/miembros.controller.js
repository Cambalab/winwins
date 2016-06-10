(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MiembrosController', MiembrosController);

  /** @ngInject */
  function MiembrosController(miembro) {
    var vm = this;

    vm.current_page = 0

    miembro.getList(vm.current_page, 18).then(function(data) {
      vm.miembros = data;
    });

    vm.nextPage = function() {
      if (!vm.stop_paged){
        vm.current_page = vm.current_page + 1;
      
        miembro.getList(vm.current_page, 18).then(function(data) {
          vm.miembros.push.apply(vm.miembros, data);
          if (data.length < 18){
            vm.stop_paged = true;
          }    
        });
      }
    }
  }

})();
