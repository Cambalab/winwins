(function() {
  'use strict';

  angular
      .module('winwins')
      .service('winwin', winwin);

  /** @ngInject */
  function winwin($log, Restangular) {

    var _winwin = {};

    var rWinwin = Restangular.all('winwins');
    var rParametric = Restangular.all('parametric');

    _winwin.getInterests = function() {
      return rParametric.customGET('interests');
    };

    _winwin.getList = function(page, filter, offset) {
      var default_offset = 15;
      var default_page = 0;
      var default_list = 'all';

      page  = typeof page !== 'undefined' ? page : default_page;
      filter = typeof filter !== 'undefined' ? filter : default_list;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset + '/' + filter;
      return rWinwin.customGET(paginateUrl);
    };

    _winwin.getListByCategory = function(page, categories, offset) {
      var default_offset = 15;
      var default_page = 0;

      page  = typeof page !== 'undefined' ? page : default_page;
      offset = typeof offset !== 'undefined' ? offset : default_offset;

      var paginateUrl = 'paginate' + '/' + page + '/' + offset;
      return rWinwin.customGET(paginateUrl, {categories: [categories]});
    };

    _winwin.getWinwin = function(id) {
      return Restangular.one('winwins', id).get();
    }

    _winwin.saveWinwin = function(winwin) {
      return Restangular.all('winwins').post(winwin);
    };

    _winwin.uploadImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return Restangular.one('winwins')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    _winwin.uploadPostImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return Restangular.one('posts')
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    _winwin.getPosts = function(id) {
      return Restangular.one('posts/winwin', id).one('posts').get();
    }

    _winwin.createPost = function(post) {
      return Restangular.all('posts').post(post);
    }

    _winwin.votePost = function(id, positive) {
      return Restangular.one('posts', id).customPOST({positive: positive}, 'vote', undefined, undefined);
    }

    _winwin.activate = function(id) {
      return Restangular.one('winwins/activate', id).get();
    }
    
    _winwin.join = function(id) {
      return Restangular.one('winwins/join', id).get();
    }

    _winwin.left = function(id) {
     return Restangular.one('winwins/left', id).get(); 
    }

    _winwin.shareMails = function(id, mails) {
      return Restangular.one('winwins', id).customPOST({mails: mails}, 'share/mails', undefined, undefined);
    }

    return _winwin;
  }

})();
