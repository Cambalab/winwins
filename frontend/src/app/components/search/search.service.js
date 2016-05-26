(function() {
  'use strict';

  angular
      .module('winwins')
      .service('search', search);

  /** @ngInject */
  function search($log, Restangular) {

    var _search = {};

    _search.search = function(query) {
      return Restangular.one('ww').customGET('search', {q: query});
    };

    return _search;
  }

})();