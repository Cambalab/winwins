(function() {
  'use strict';

  angular
      .module('winwins')
      .service('account', account);

  /** @ngInject */
  function account($log, Restangular, $http, ENV) {

    var _account = {};

    var rAccount = Restangular.one('me');

    _account.getProfile = function() {
      return  rAccount.get();
    };

    _account.uploadImage = function(data, name) {
      var fd = new FormData();
      fd.append('file', data, name);

      return rAccount
      .withHttpConfig({transformRequest: angular.identity})
      .customPOST(fd, 'upload', undefined, {'Content-Type': undefined})
    }

    _account.emailResetPass = function(email){
      return $http.post(ENV.base + '/password/email', {"email": email});
    }

    _account.notificactionsRed = function(user){
      return rAccount.customGET('notificactions/read', {user: user});
    }

    return _account;
  }

})();
