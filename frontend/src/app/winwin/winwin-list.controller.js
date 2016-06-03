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

    winwin.getList(vm.current_page, 'select').then(function(data) {
      vm.destacados = data;
    });

    winwin.getInterests().then(function(data) {
      vm.interests = data;
    });

    vm.tdestacados = gettextCatalog.getString(gettext('Winwins Destacados'));
    vm.tpopulares = gettextCatalog.getString(gettext('Winwins Populares'));
    vm.trecientes = gettextCatalog.getString(gettext('Winwins Recientes'));
    vm.tterminar = gettextCatalog.getString(gettext('Winwins por terminar'));
    vm.tconcretados = gettextCatalog.getString(gettext('Winwins concretados'));

    var _filter = 'select'
    var _categories = [];
    vm.doFilter = function(filter, next) {
      if (!next) {
        vm.current_page = 0;
      }

      _categories = [];
      _filter = filter;
      winwin.getList(vm.current_page, filter, 50).then(function(data) {
        if (next) {
          vm.destacados.push.apply(vm.destacados, data);   
        } else {
          vm.destacados = data;
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
          vm.destacados = data;
        });
      }
    };

    vm.nextPage = function() {
      vm.current_page = vm.current_page + 1;
      vm.doFilter(_filter, true);
    }

    vm.isChecked = function(id) {
      return _categories.indexOf(id) > -1;
    }
  }

})();
