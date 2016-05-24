(function() {
  'use strict';

  angular
      .module('winwins')
      .service('grupo', grupo);

  /** @ngInject */
  function grupo($log, Restangular) {

    var _grupo = {};

    var rGrupo = Restangular.all('groups');

    _grupo.getList = function(page, offset) {
      var default_offset = 15;
      var default_page = 0;

      page  = typeof page !== 'undefined' ? page : default_page;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset;
      return rGrupo.customGET(paginateUrl);
    };

    _grupo.getGroup = function(id) {
      return Restangular.one('group', id).get();
    }

    return _grupo;
  }

})();
