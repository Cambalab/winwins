(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('WinwinListController', WinwinListController);

  /** @ngInject */
  function WinwinListController(winwin) {
    var vm = this;
    winwin.getList(0, 'select', 15).then(function(data) {
      vm.destacados = data;
    });
  }

})();
