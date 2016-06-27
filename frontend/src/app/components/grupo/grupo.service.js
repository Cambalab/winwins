(function() {
  'use strict';

  angular
      .module('winwins')
      .service('grupo', grupo);

  /** @ngInject */
  function grupo($log, Restangular) {

    var _grupo = {};

    var rGrupo = Restangular.all('groups');
    var rParametric = Restangular.all('parametric');

    _grupo.getList = function(page, offset) {
      var default_offset = 15;
      var default_page = 0;

      page  = typeof page !== 'undefined' ? page : default_page;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset;
      return rGrupo.customGET(paginateUrl);
    };

    _grupo.getInterests = function() {
      return rParametric.customGET('interests');
    };

    _grupo.getGroup = function(id) {
      return Restangular.one('group', id).get();
    }

    _grupo.saveGrupo = function(grupo) {
       return Restangular.all('groups').post(grupo);
    };

    _grupo.close = function(id, reason) {
     return Restangular.one('group', id).customPOST({body: reason}, 'close', undefined, undefined);
    }

    _grupo.uploadImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return Restangular.one('groups')
          .withHttpConfig({transformRequest: angular.identity})
          .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    _grupo.getPosts = function(id) {
      return Restangular.one('posts/group', id).one('posts').get();
    }

    _grupo.createPost = function(post) {
      return Restangular.all('posts').post(post);
    }

    _grupo.createComment = function(id, content, media_id, media_type, media_path) {
      return Restangular.one('posts', id).customPOST({
        content: content,
        media_id: media_id,
        media_type: media_type,
        media_path: media_path,
        type: 'WWG_COMMENT'
      }, 'comment', undefined, undefined);
    }

    _grupo.votePost = function(id, positive) {
      return Restangular.one('posts', id).customPOST({positive: positive}, 'vote', undefined, undefined);
    }

    _grupo.stickyPost = function(id, sticky) {
      return Restangular.one('posts', id).customPOST({sticky: sticky}, 'sticky', undefined, undefined);
    }

    _grupo.removePost = function(id) {
      return Restangular.one('posts', id).customPOST(undefined, 'remove', undefined, undefined);
    }

    _grupo.join = function(id){
      return Restangular.one('groups/join', id).get();
    }

    _grupo.left = function(id) {
     return Restangular.one('groups/left', id).get(); 
    }

    _grupo.addWinwin = function(groupId, winwinId){
      return Restangular.one('groups', groupId).one('add_winwin', winwinId).get();
    }

    _grupo.shareMails = function(id, mails) {
      return Restangular.one('groups', id).customPOST({mails: mails}, 'share/mails', undefined, undefined);
    }

    _grupo.uploadPostImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return Restangular.one('posts')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    return _grupo;
  }

})();
