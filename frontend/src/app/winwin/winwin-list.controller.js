(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('WinwinListController', WinwinListController);

  /** @ngInject */
  function WinwinListController(winwin, gettextCatalog, gettext) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';

    vm.current_page = 0

    winwin.getList(vm.current_page, 'last', 9).then(function(data) {
      vm.winwins = data;
    });

    winwin.getInterests().then(function(data) {
      vm.interests = data;
    });

    vm.loadingDestacados = false;
    vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Destacados'));
    var _filter = 'last';
    var _categories = [];
    vm.doFilter = function(filter, next) {
      if (!next) {
        vm.current_page = 0;
        vm.stop_paged = false;
        vm.loadingDestacados = true;
      }

      _categories = [];
      _filter = filter;
      winwin.getList(vm.current_page, filter, 9).then(function(data) {
        if (next) {
          vm.winwins.push.apply(vm.winwins, data);   
        } else {
          vm.winwins = data;
          vm.loadingDestacados = false;
        }
        if (data.length < 9){
          vm.stop_paged = true;
        }

        switch(filter) {
          case 'select':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Destacados'));
            break;
          case 'popular':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Populares'));
            break;
          case 'last':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Todos los Winwins'));
            break;
          case 'finishing':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins por terminar'));
            break;
          case 'success':
            vm.destacadosTitle  = gettextCatalog.getString(gettext('Winwins concretados'));
            break;
        }
      });
    };
    
    vm.doCategories = function(id, next) {
      if (!next) {
        vm.current_page = 0;
      }

      var _index = _categories.indexOf(id);
      
      if (_index == -1) {
        _categories.push(id);
      } else {
        _categories.splice(_index, 1);
      }

      if (_categories.length == 0) {
        vm.doFilter(_filter);
      } else {
        winwin.getListByCategory(vm.current_page, _categories.join(',')).then(function(data) {
          vm.winwins = data;
        });
      }
    };

    vm.nextPage = function() {
      if (!vm.stop_paged && !vm.loadingDestacados){
        vm.current_page = vm.current_page + 1;
        vm.doFilter(_filter, true);
      }
    }

    vm.isChecked = function(id) {
      return _categories.indexOf(id) > -1;
    }
  }

})();
