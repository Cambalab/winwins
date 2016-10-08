(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('PublicProfileController', PublicProfileController);

  /** @ngInject */
  function PublicProfileController($log, user, ENV, $document, $stateParams, $window, account, $mdDialog, winwin) {
    var vm = this;

    vm.userId = $stateParams.userId;
    vm.imageServer = ENV.imageServer;
    vm.user = {interests_list:[]};
    vm.is_public = true;

    user.getUser(vm.userId)
    .then(function(user_data) {
      vm.user = user_data;
      vm.user.activities;
      for(var i = 0;i<vm.user.activities.length;i++) {
        vm.user.activities[i].type = user_data.activities[i].type;
        vm.user.activities[i].title = user_data.activities[i].title;

        if (user_data.activities[i].type == 'WW_JOIN') {
          vm.user.activities[i].mensajito = ' se unió al winwin ';
        }
        if (user_data.activities[i].type == 'WW_LEFT') {
          vm.user.activities[i].mensajito = ' abandonó el winwin '
        }
        if (user_data.activities[i].type == 'WW_CREATED') {
          vm.user.activities[i].mensajito = ' creó el winwin ';
        }
        if (user_data.activities[i].type == 'WW_SUCCESSFUL') {
          vm.user.activities[i].mensajito = ' participó en el winwin ';
        }

        if (user_data.activities[i].type == 'GROUP_CREATED') {
          vm.user.activities[i].mensajito = ' creó el grupo ';
        }
        if (user_data.activities[i].type == 'GROUP_JOIN') {
          vm.user.activities[i].mensajito = ' unió al grupo ';
        }
        if (user_data.activities[i].type == 'GROUP_LEFT') {
          vm.user.activities[i].mensajito = ' abandonó el grupo ';
        }

        if (user_data.activities[i].type == 'USER_FOLLOW') {
          vm.user.activities[i].mensajito = ' ahora sigue a ';
        }
        if (user_data.activities[i].type == 'USER_UNFOLLOW') {
          vm.user.activities[i].mensajito = ' ahora sigue a ';
        }

        if (user_data.activities[i].type == 'WW_JOIN') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'WW_LEFT') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'WW_CREATED') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'WW_SUCCESSFUL') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'GROUP_CREATED') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'GROUP_JOIN') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'GROUP_LEFT') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'USER_FOLLOW') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

        if (user_data.activities[i].type == 'USER_UNFOLLOW') {
          vm.user.activities[i].titulo = vm.user.activities[i].title;
        }

      }

      vm.is_complete = (user_data.name && user_data.lastname && user_data.email && user_data.birthdate);
      vm.groups = user_data.groups;
      if (vm.user.birthdate) {
        vm.user.birthdate = new Date(vm.user.birthdate);
      }
      
      vm.creadospormi = $window._.filter(vm.user.winwins, function(winwin) {
        return winwin.user_id == vm.user.user_id && winwin.canceled == 0;
      });

      vm.enqueparticipo = $window._.filter(vm.user.winwins, function(winwin) {
        return winwin.user_id != vm.user.user_id && winwin.canceled == 0;
      });

      vm.winwins_length = vm.creadospormi.length + vm.enqueparticipo.length;

    });

    vm.unfollow = function(id){
      user.unfollow(id);
      $mdDialog.show({
        templateUrl: 'app/profile/modal-unfollow.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true
      });
    }

    vm.follow = function(id){

        user.follow(id);
        $mdDialog.show({
            templateUrl: 'app/profile/modal-follow.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true
      });
    }

    vm.sendMessage = function(convid, msj){
      user.sendMessage({ conversation_id: convid, message: msj, receiver_id: vm.userId, subject : 'SUBJECT'})
    }
  }


})();
