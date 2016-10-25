(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('PublicProfileController', PublicProfileController);

  /** @ngInject */
  function PublicProfileController(user, ENV, $document, $stateParams, $window, account, $mdDialog, winwin, $auth, $rootScope) {
    var vm = this;
    // var expandCollapseApp = angular.module('expandCollapseApp', ['ngAnimate']);
    //
    // expandCollapseApp.controller('expandCollapseCtrl', function ($scope) {
    //   $scope.active = false;
    //   $scope.active1 = false;
    //
    // });

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
      user.unfollow(id).then(function(data){
        $mdDialog.show({
          controller: 'PublicProfileController',
          controllerAs: 'profile',
          templateUrl: 'app/profile/modal-unfollow.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true
        });
        if(data[0] =='unfollow'){
          vm.user.already_following = false;
        }
      });
    }

    vm.follow = function(id){

      if($auth.isAuthenticated()) {
        user.follow(id).then(function(data){
          $mdDialog.show({
              controller: 'PublicProfileController',
              controllerAs: 'profile',
              templateUrl: 'app/profile/modal-follow.tmpl.html',
              parent: angular.element($document.body),
              clickOutsideToClose:true
          });
          if(data[0]=='follow'){
            vm.user.already_following = true;
          }
        });

      } else {
        $mdDialog.show({
          controller: 'LoginController',
          controllerAs: 'login',
          templateUrl: 'app/login/login.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true
        }).then(function(success) {
          vm.follow(vm.userId);
        })
      }
    }

    vm.sendMessage = function(convid, msj){
        user.sendMessage({
          conversation_id: convid,
          message: msj,
          receiver_id: vm.userId, subject : 'asunto new conversation'
        }).then(function(data){
      })
    }

    vm.inbox = function ($http) {
        $mdDialog.show({
            controller: 'PublicProfileController',
            controllerAs: 'profile',
            templateUrl: 'app/profile/modal-inbox.tmpl.html',
            clickOutsideToClose: true
        });
    };

    vm.mensaje= function ($http) {
        $mdDialog.show({
            controller: 'PublicProfileController',
            controllerAs: 'profile',
            templateUrl: 'app/profile/modal-mensaje.tmpl.html',
            clickOutsideToClose: true,
            parent: angular.element($document.body)
        });
    };


   vm.showMessageModal = function(conversationId, conversation_messages) {
    $mdDialog.show({
        controller: MessageModalController,
        controllerAs: 'msgController',
      templateUrl: 'app/profile/message-modal-controller.tmpl.html',
      clickOutsideToClose: true,
      locals: {
        myself_id: user.myself,
        conversation_id: conversationId,
        to_user_id: vm.userId,
        conversation_messages: conversation_messages
      }
    });
  }

    vm.showLoginDialog = function(redirect) {
      if (redirect) {
        $rootScope.returnState = {
          state: redirect
        };
      }
      $mdDialog.show({
        controller: 'LoginController',
        controllerAs: 'login',
        templateUrl: 'app/login/login.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true
      });
    };
    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };
  }

  /** @ngInject */
  function MessageModalController(ENV, conversation_id, to_user_id, conversation_messages, user, $mdDialog, $timeout){
    var vm = this;

    vm.imageServer = ENV.imageServer
    vm.myself_id = user.myself,
    vm.conversation_messages = conversation_messages,
    vm.toUserId = to_user_id;
    vm.messages = conversation_messages;
    vm.mensaje = "";
    vm.sendMessageStatus = "notSended";
    vm.conversationId = conversation_id;

        vm.sendMessage = function(){
      user.sendMessage({
        conversation_id: vm.conversationId,
        message: vm.mensaje,
        receiver_id: vm.toUserId,
        subject : 'asunto new conversation'
      }).then(function(data){
        if(data[0]=='enviado'){
          vm.sendMessageStatus = "Sended";
          $timeout(function() {
            $mdDialog.hide(data);
            }, 3000);
        }
      });
    }
  }

})();
