(function() {
    'use strict';
    angular
        .module('winwins')
        .controller('PublicGrupoProfileController', PublicGrupoProfileController);

    /** @ngInject */
    function PublicGrupoProfileController(ENV, grupo, $stateParams, user, $mdDialog, $auth, $rootScope, $document, account) {
        var vm = this;

        vm.base = ENV.base;
        vm.imageServer = ENV.imageServer;
        vm.groupId = $stateParams.groupId;
        
        grupo.getGroup(vm.groupId).then(function(group_data) {
            vm.profile = group_data;

            user.getUser(group_data.user_id).then(function(user_data){
                vm.group_creator = user_data;
            });
        });

        vm.join = function() {
            if($auth.isAuthenticated()) {
                grupo.join(vm.groupId).then(function(data) {

                    $mdDialog.show({
                        controller: ModalConfirmacionSumarseController,
                        controllerAs: 'vm',
                        templateUrl: 'app/grupo/modal-confirmacion-sumarse-a-grupo.tmpl.html',
                        parent: angular.element($document.body),
                        clickOutsideToClose:true,
                        locals: {
                            current_grupo: vm.profile
                        }
                    });
                });
            } else {
                $rootScope.returnState = {
                    state: 'home.grupo-profile',
                    parameters: {
                        groupId: vm.groupId
                    }
                };
                $mdDialog.show({
                    controller: 'LoginController',
                    controllerAs: 'login',
                    templateUrl: 'app/login/login.tmpl.html',
                    parent: angular.element($document.body),
                    clickOutsideToClose:true
                });
            }
        }

        vm.showModalShareEmailDialog = function() {
          $mdDialog.show({
            controller: ModalShareEmailController,
            controllerAs: 'vm',
            templateUrl: 'app/grupo/modal-share-email.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            locals: {
              current_group: vm.profile
            }
          });
        }

        vm.showMasDetalleDialog = function(ev) {
          $mdDialog.show({
            controller: MasDetalleController,
            templateUrl: 'app/grupo/ver-mas-detalle.tmpl.html',
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
              grupo: vm.profile
            }
          });
        };

        vm.showUserWinwinsModal = function() {
            if ($auth.isAuthenticated()) {
                account.getProfile().then(function(profile_data) {
                    user.getUser(profile_data.user.id).then(function(user_data){
                        $mdDialog.show({
                            controller: ModalVerWinwinsDeUsuario,
                            controllerAs: 'vm',
                            templateUrl: 'app/grupo/modal-agregar-winwin-a-grupo.tmpl.html',
                            parent: angular.element($document.body),
                            clickOutsideToClose:true,
                            locals: {
                                user_winwins: user_data.winwins,
                                winwins_already_add: vm.profile.winwins, 
                                groupId: vm.groupId,
                                groupName: vm.profile.name
                            }
                        });                        
                    })
                })
            } else {
                $rootScope.returnState = {
                    state: 'home.grupo-profile',
                    parameters: {
                        groupId: vm.groupId
                    }
                };
                $mdDialog.show({
                    controller: 'LoginController',
                    controllerAs: 'login',
                    templateUrl: 'app/login/login.tmpl.html',
                    parent: angular.element($document.body),
                    clickOutsideToClose:true
                });
            }
        }
    }

    /** @ngInject */
    function ModalVerWinwinsDeUsuario(ENV, grupo, user, user_winwins, winwins_already_add, groupId, $window, groupName) {
        var vm = this;

        vm.base = ENV.base;
        vm.imageServer = ENV.imageServer;
        vm.user_winwins = user_winwins;
        vm.winwins_already_add = winwins_already_add;
        vm.grupoId = groupId;
        vm.groupName = groupName;
        vm.success = false;
        vm.user_have_winwins = vm.user_winwins.length == 0 ? false : true;
        vm.not_added_winwins = $window._.filter(vm.user_winwins, function(user_winwin){

            var isWinwinInList = $window._.filter(vm.winwins_already_add, function(winwin_already_add){
                return user_winwin.id == winwin_already_add.id;
            })

            return isWinwinInList.length == 0;
        });

        vm.all_user_winwins_added = vm.user_have_winwins && vm.not_added_winwins.length == 0;

        vm.addWinwinToGroup = function(winwinId) {
            grupo.addWinwin(vm.grupoId, winwinId).then(function(){
                vm.success = true;
            })
        }

        user.getUser(grupo.user_id).then(function(user_data){
            vm.group_creator = user_data;
        });
    }

  /** @ngInject */
  function ModalShareEmailController(current_group) {
    var vm = this;
  }


    /** @ngInject */
    function ModalConfirmacionSumarseController(current_grupo, ENV) {
        var vm = this;

        vm.base = ENV.base;
        vm.imageServer = ENV.imageServer;
        vm.facebookId = ENV.satellizer.facebook.clientId;
        vm.status = 'success';
        vm.grupo = current_grupo;
    }

    /** @ngInject */
    function MasDetalleController($scope, grupo) {
        $scope.grupo = grupo;
    }

})();

