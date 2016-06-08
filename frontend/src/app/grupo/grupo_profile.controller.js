(function() {
    'use strict';
    angular
        .module('winwins')
        .controller('PublicGrupoProfileController', PublicGrupoProfileController);

    /** @ngInject */
    function PublicGrupoProfileController(ENV, grupo, $stateParams, user, $mdDialog, $auth, $rootScope, $document, account, sponsor) {
        var vm = this;

        vm.base = ENV.base;
        vm.imageServer = ENV.imageServer;
        vm.groupId = $stateParams.groupId;
        vm.facebookId = ENV.satellizer.facebook.clientId;
        
        grupo.getGroup(vm.groupId).then(function(group_data) {
            vm.profile = group_data;

            user.getUser(group_data.user_id).then(function(user_data){
                vm.group_creator = user_data;
                sponsor.getList().then(function(sponsor_data) {
                    vm.sponsors = sponsor_data;
                });
            });
        });

        vm.join = function() {
            if($auth.isAuthenticated()) {
                grupo.join(vm.groupId).then(function(group_data) {

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

        vm.left = function() {
          $mdDialog.show({
            controller: ModalAbandonarGrupoController,
            controllerAs: 'vm',
            templateUrl: 'app/grupo/modal-abandonar-grupo.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            locals: {
              current_group: vm.profile
            }
          })
          .then(function(data) {
            // TODO Ver que informacion actualizar una vez que uno abandono el grupo
          });
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
    function ModalVerWinwinsDeUsuario(ENV, grupo, user, user_winwins, winwins_already_add, groupId, $window, groupName, $scope) {
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
            grupo.addWinwin(vm.grupoId, winwinId).then(function(group_data){
                vm.success = true;
                $scope.$parent.profile.winwins = group_data.winwins;
            })
        }

        user.getUser(grupo.user_id).then(function(user_data){
            vm.group_creator = user_data;
        });
    }

    /** @ngInject */
    function ModalShareEmailController(current_group, grupo) {
        var vm = this;

        vm.grupo = current_group;
        vm.emailsOK = false;
        vm.mails = [];

        vm.validateMail = function(chip) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(chip))
            {
                var index = vm.mails.indexOf(chip);
                vm.mails.splice(index, 1);
            }
        }

        vm.sentInvitations = function() {
            grupo.shareMails(vm.grupo.id, vm.mails).then(function() {
                vm.mails = [];
                vm.emailsOK = true;
            });
        }
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

    /** @ngInject */
    function ModalAbandonarGrupoController(current_group, $mdDialog, grupo) {
        var vm = this;

        vm.left = function() {
          grupo.left(current_group.id).then(function(data) {
             $mdDialog.hide(data);
          });
        }

        vm.cancel = function() {
          $mdDialog.cancel();
        }
    }

})();

