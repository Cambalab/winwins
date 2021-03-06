(function() {
  'use strict';
  angular
    .module('winwins')
    .controller('SearchController', SearchController);

  /** @ngInject */
  function SearchController($stateParams, search, $window) {
    var vm = this;

    vm.query = $stateParams.query;

    search.search(vm.query).then(function(data) {
      vm.winwins = $window._.filter(data, function(result) {
        return result._type == 'winwins' && result._source.canceled != 1; 
      }).map(function(obj){ 
        return obj._source;
      });

      vm.users = $window._.filter(data, function(result) {
        return result._type == 'users'; 
      }).map(function(obj){ 
        return obj._source;
      });

      vm.result_length = vm.winwins.length + vm.users.length;
    });
  }

})();