(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('PublicProfileController', PublicProfileController);

  /** @ngInject */
  function PublicProfileController(user, ENV, $document, $stateParams, $window, account, $mdDialog, winwin) {
    var vm = this;

    vm.userId = $stateParams.userId;
    vm.imageServer = ENV.imageServer;
    vm.user = {interests_list:[]};
    vm.is_public = true;

    user.getUser(vm.userId)
    .then(function(user_data) {
      vm.user = user_data;
      vm.user.activities;
      console.log(vm.user.activities.length);
      for(var i = 0;i<vm.user.activities.length;i++){
        vm.user.activities[i].type = user_data.activities[i].type;
        vm.user.activities[i].title = user_data.activities[i].title;

        if(user_data.activities[i].type=='WW_JOIN'){
          vm.user.activities[i].mensajito = vm.user.name+' se unió al winwin '+vm.user.activities[i].title;
        }
        if(user_data.activities[i].type=='WW_LEFT'){
          vm.user.activities[i].mensajito = vm.user.name+' abandonó el winwin '+vm.user.activities[i].title;
        }
        if(user_data.activities[i].type=='WW_CREATED'){
          vm.user.activities[i].mensajito = vm.user.name+' creó el winwin '+vm.user.activities[i].title;
        }
        if(user_data.activities[i].type=='WW_SUCCESSFUL'){
          vm.user.activities[i].mensajito = vm.user.name+' participó en el winwin '+vm.user.activities[i].title;
        }

        if(user_data.activities[i].type=='GROUP_CREATED'){
          vm.user.activities[i].mensajito = vm.user.name+' creó el grupo '+vm.user.activities[i].title;
        }
        if(user_data.activities[i].type=='GROUP_JOIN'){
          vm.user.activities[i].mensajito = vm.user.name+' unió al grupo '+vm.user.activities[i].title;
        }
        if(user_data.activities[i].type=='GROUP_LEFT'){
          vm.user.activities[i].mensajito = vm.user.name+' abandonó el grupo '+vm.user.activities[i].title;
        }

        if(user_data.activities[i].type=='USER_FOLLOW'){
          vm.user.activities[i].mensajito = vm.user.name+' creó el grupo '+vm.user.activities[i].title;
        }
        if(user_data.activities[i].type=='GROUP_UNFOLLOW'){
          vm.user.activities[i].mensajito = vm.user.name+' unió al grupo '+vm.user.activities[i].title;
        }

        console.log(vm.user.activities[i].type);
        console.log(vm.user.activities[i].title);
      }

      /*for(var act in vm.user.notifications) {
        if (act.type == 'WW_JOIN'){
          act.type = 'Se sumo al winwin ';
        }else{
          act.type = 'no se sump';
        }
      }*/

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

    vm.showSeguirDialog = function() {
      $mdDialog.show({
        controller: SeguirController,
        templateUrl: 'app/profile/modal-seguir.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true
      });
    }
  }

  function SeguirController() {

  }

})();
