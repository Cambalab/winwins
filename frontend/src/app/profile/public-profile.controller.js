(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('PublicProfileController', PublicProfileController);

  /** @ngInject */
  function PublicProfileController(user, $q, ENV, $state, $document, $stateParams, $window, account, $mdDialog, winwin, $auth, $rootScope) {
    var vm = this;
   
    vm.userId = $stateParams.userId;
    vm.imageServer = ENV.imageServer;
    vm.user = {interests_list:[]};
    vm.is_public = true;
    vm.avatar = '';
    
    user.getUser(vm.userId)
    .then(function(user_data) {
      vm.user = user_data;
      vm.user.activities;
      for(var i = 0;i<vm.user.activities.length;i++) {
        vm.user.activities[i].type = user_data.activities[i].type;
        vm.user.activities[i].title = user_data.activities[i].title;
        vm.user.activities[i].titulo = vm.user.activities[i].title; // legacy, hay que ver si se usa titulo y si se puede unificar y eliminar uno

        switch (vm.user.activities[i].type.split('_')[0]) {
          case "WW":
            vm.user.activities[i].activity_url = "http://" + $window.location["hostname"] + ":" + $window.location["port"] + 
                                                 '/#/winwin/' + vm.user.activities[i].id;
            break;
          case "GROUP":
            vm.user.activities[i].activity_url = "http://" + $window.location["hostname"] + ":" + $window.location["port"] + 
                                                 '/#/grupo/' + vm.user.activities[i].id;
            break;
          case "USER":
            vm.user.activities[i].activity_url = "http://" + $window.location["hostname"] + ":" + $window.location["port"] + 
                                                 '/#/profile/' + vm.user.activities[i].id;
            break;
          default:  
            vm.user.activities[i].activity_url = '#';
        }

        switch (user_data.activities[i].type) {
          case 'WW_JOIN':
            vm.user.activities[i].mensajito = ' se unió al winwin ';
            break;
          case 'WW_LEFT' :
            vm.user.activities[i].mensajito = ' abandonó el winwin ';
            break;
          case 'WW_CREATED':
            vm.user.activities[i].mensajito = ' creó el winwin ';
            break;
          case 'WW_SUCCESSFUL':
            vm.user.activities[i].mensajito = ' participó en el winwin ';
            break;
          case 'GROUP_CREATED':
            vm.user.activities[i].mensajito = ' creó el grupo ';
            break;
          case 'GROUP_JOIN':
            vm.user.activities[i].mensajito = ' unió al grupo ';
            break;
          case 'GROUP_LEFT':
            vm.user.activities[i].mensajito = ' abandonó el grupo ';
            break;
          case 'USER_FOLLOW':
            vm.user.activities[i].mensajito = ' ahora sigue a ';
            break;
          case 'USER_UNFOLLOW':
            vm.user.activities[i].mensajito = ' ahora sigue a ';
            break;
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
      vm.avatar = vm.imageServer+'/smart/'+vm.user.photo;
    });

    var dataURItoBlob = function(dataURI) {
      var binary = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var array = [];
      for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      return new Blob([new Uint8Array(array)], {type: mimeString});
    };

    vm.showCropAvatarDialog = function(ev) {
      $mdDialog.show({
        controller: CropAvatarController,
        templateUrl: 'app/profile/avatar_crop.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
          .then(function(image) {
            vm.avatar_image = image;
            vm.avatar = image.file;
          }).then(function(){
        vm.current_password_wrong_message = '';

        var promises = [];

        if (vm.avatar_image) {
          promises.push(account.uploadImage(dataURItoBlob(vm.avatar_image.file), vm.avatar_image.name));
        }
        if (vm.cover_image) {
          promises.push(account.uploadImage(dataURItoBlob(vm.cover_image.file), vm.cover_image.name));
        }

        $q.all(promises).then(function(data) {
          var indexAvatar = 0;
          var indexCover = 1;
          if (!vm.avatar_image) {
            indexCover = 0;
          }

          if (vm.avatar_image) {
            vm.user.photo = data[indexAvatar].filename;
          }
          if (vm.cover_image) {
            vm.user.cover_photo = data[indexCover].filename;
          }

          vm.user.language_code = 'ES';

          user.saveProfile(vm.user)
              .then(function(){
                $rootScope.$broadcast('account_change');

                $mdDialog.show({
                  controller: CropAvatarController,
                  templateUrl: 'app/profile/modal_success.tmpl.html',
                  parent: angular.element($document.body),
                  clickOutsideToClose:true
                });

                $state.go('home.public-profile', {
                  userId: vm.user.id
                });
              })
              .catch(function(response) {
                if(response.data) {
                  if(response.data.message == 'user_current_password_wrong') {
                    //$scope.profileForm.current_password.$setValidity("currentPasswordWrong", false);
                  }
                }
              });


          //vm.processing = false;
        });
      });
    };

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
          user.getUser(id).then(function(data){
            vm.user = data;
          })
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
            user.getUser(id).then(function(data){
              vm.user = data;
            })
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

  function CropAvatarController($scope, $mdDialog) {
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.fileName='';

    $scope.handleFileSelect = function(evt) {
      var file=evt.files[0];
      $scope.fileName = file.name;
      var reader = new FileReader();
      reader.onload = function (evt) {
        $scope.$apply(function($scope){
          $scope.myImage=evt.target.result;
        });
      };
      reader.readAsDataURL(file);
    };

    $scope.cropImage = function() {
      $mdDialog.hide({file:$scope.myCroppedImage, name:$scope.fileName});
    }
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
