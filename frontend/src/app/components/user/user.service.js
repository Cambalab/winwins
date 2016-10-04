(function() {
  'use strict';

  angular
      .module('winwins')
      .service('user', user);

  /** @ngInject */
  function user($log, Restangular) {

    var _user = {};

    _user.getUser = function(id) {
      return Restangular.one('users', id).get();
    };

    _user.saveProfile = function(user) {
      return Restangular.all('profile').post(user);
    };

    _user.resendActivationMail = function() {
      return Restangular.one('users/resend/activation').get();
    }
    
    _user.getGroups = function() {
      return Restangular.one('groups/creator').get();
    }

    _user.sendMailContact = function(contact) {
      return Restangular.one('users').customPOST({contact:contact}, 'sent_mail_contact', undefined, undefined);
    }

    _user.getSkills = function(queryText) {
      return Restangular.all('skills').customPOST({ q: queryText }, "search", undefined, undefined);
    }

    _user.follow = function (id){
      return Restangular.one('users/follow', id).get();
    }

    _user.unfollow = function (id){
      return Restangular.one('users/unfollow', id).get();
    }

    return _user;
  }

})();
