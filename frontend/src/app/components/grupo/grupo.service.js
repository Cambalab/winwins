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

    _grupo.saveGrupo = function(grupo) {
       return Restangular.all('groups').post(grupo);
    };

    _grupo.uploadImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return Restangular.one('groups')
          .withHttpConfig({transformRequest: angular.identity})
          .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    _grupo.join = function(id){
      return Restangular.one('groups/join', id).get();
    }

    _grupo.addWinwin = function(groupId, winwinId){
      return Restangular.one('groups', groupId).one('add_winwin', winwinId).get();
    }

    return _grupo;
  }

})();
