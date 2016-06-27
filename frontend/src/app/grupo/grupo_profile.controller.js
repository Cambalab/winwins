(function() {
    'use strict';
    angular
        .module('winwins')
        .controller('PublicGrupoProfileController', PublicGrupoProfileController);

    /** @ngInject */
    function PublicGrupoProfileController(ENV, grupo, $stateParams, user, $mdDialog, $sce, $auth, $rootScope, $document, account, sponsor, $window, $q) {
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
                      grupo.getPosts(vm.groupId).then(function(posts_data) {
                        vm.posts = posts_data.posts;

                        vm.post = {content: '', reference_id: group_data.id, type: 'GROUP'}
                      });
                });
            });
        });

      sponsor.getList().then(function(sponsor_data) {
        vm.sponsors = sponsor_data;
      });

        account.getProfile().then(function(data) {
          vm.account = data.profile;

          vm.campanadas = $window._.filter(data.user.notifications, function(notification) {
            return notification.type == "CAMPANADA" && notification.object_id == vm.groupId; 
          });
        });

        vm.submitPost = function() {
          if (vm.post.content == '' && !vm.post.media_path && !vm.cover_post_image) {
            return;
          }

          var promises = [];

          if (vm.post.media_type == 'IMAGE' && vm.cover_post_image) {
            promises.push(grupo.uploadPostImage(dataURItoBlob(vm.cover_post_image.file), vm.cover_post_image.name));
          }

          $q.all(promises).then(function(data) {
            if (vm.cover_post_image) {
              vm.post.media_id = data[0].media_id;
              vm.post.media_path = data[0].filename;
              vm.cover_post_image = null;
            }

            grupo.createPost(vm.post)
            .then(function(data){
              grupo.getPosts(vm.groupId).then(function(posts_data) {
                vm.posts = posts_data.posts;
              });
              vm.post = {content: '', reference_id: vm.groupId, type: 'GROUP'}
            });
          });
        }

        var dataURItoBlob = function(dataURI) {
          var binary = atob(dataURI.split(',')[1]);
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
          var array = [];
          for(var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
          }
          return new Blob([new Uint8Array(array)], {type: mimeString});
        };

        vm.getIframeSrc = function (videoId) {
            return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+videoId+'?autoplay=0');
        };

        vm.showReplyDialog = function(post) {
          vm.modalReply = {
            controller: ReplyController,
            controllerAs: 'vm',
            templateUrl: 'app/winwin/modal-comment.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            preserveScope:true,
            locals: {
              current_post: post,
              current_account: vm.account,
              current_scope: vm,
              comment: {},
              cover_comment_image: null
            }
          }

          $mdDialog.show(vm.modalReply).then(function(data) {
            grupo.getPosts(vm.groupId).then(function(posts_data) {
              vm.posts = posts_data.posts;
            });
          });
        };

        vm.showParticipantesDialog = function(ev) {
          $mdDialog.show({
            controller: ParticipantesController,
            controllerAs: 'vm',
            templateUrl: 'app/grupo/participantes.tmpl.html',
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            locals: {
              users: vm.profile.users
            }
          })
        };

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

        vm.setSticky = function(post, sticky) {
          grupo.stickyPost(post.id, sticky).then(function() {
            grupo.getPosts(vm.groupId).then(function(posts_data) {
              vm.posts = posts_data.posts;
            });
          });
        };

        vm.removePost = function(post) {
          $mdDialog.show({
            controller: ModalRemoveController,
            controllerAs: 'vm',
            templateUrl: 'app/grupo/modal-remove.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            locals: {
              current_post: post
            }
          })
          .then(function(data) {
            grupo.getPosts(vm.groupId).then(function(posts_data) {
              vm.posts = posts_data.posts;
            });
          });
        };

        vm.showCropPostImageDialog = function(ev) {
          $mdDialog.show({
            controller: CropPostImageController,
            templateUrl: 'app/grupo/cover-post-image.tmpl.html',
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })
          .then(function(image) {
            vm.post.media_type = 'IMAGE';
            vm.cover_post_image = image;
          });
        };

        vm.vote = function(post, positive) {
          grupo.votePost(post.id, positive).then(function() {
            grupo.getPosts(vm.groupId).then(function(posts_data) {
              vm.posts = posts_data.posts;
            });
          });
        };

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
                                groupName: vm.profile.name,
                                currentScope : vm
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

        vm.showModalVideoPostDialog = function(ev) {
          $mdDialog.show({
            controller: ModalVideoPostController,
            controllerAs: 'vm',
            templateUrl: 'app/grupo/modal-video-post.tmpl.html',
            parent: angular.element($document.body),
            targetEvent: ev,
            clickOutsideToClose:true
          })
          .then(function(video) {
            vm.post.media_type = 'VIDEO';
            vm.post.media_path = video;
          });
        };

        vm.close = function() {
          $mdDialog.show({
            controller: ModalCloseController,
            controllerAs: 'vm',
            templateUrl: 'app/grupo/modal-close.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            locals: {
              current_group: vm.grupo
            }
          })
          .then(function(data) {
          });
        }
    }

    /** @ngInject */
    function ModalVerWinwinsDeUsuario(ENV, grupo, user, user_winwins, winwins_already_add, groupId, $window, groupName, currentScope) {
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
                currentScope.profile.winwins = group_data.winwins;
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

    /** @ngInject */
    function ModalCloseController(current_group, $mdDialog, grupo) {
      var vm = this;

      vm.close = function() {
        grupo.close(current_group.id, vm.reason).then(function(data) {
           $mdDialog.hide(data);
        });
      }

      vm.cancel = function() {
        $mdDialog.cancel();
      }
    }

    /** @ngInject */
    function ModalVideoPostController($mdDialog) {
        var vm = this;

        vm.setVideo = function() {
          $mdDialog.hide(vm.matchYoutubeUrl(vm.video));
        }

        vm.cancel = function() {
          $mdDialog.cancel();
        }

        vm.previewVideo = function(e) {
          vm.video_path = vm.matchYoutubeUrl(e.originalEvent.clipboardData.getData('text/plain'));
        }

        vm.matchYoutubeUrl = function(url){
          var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
          return (url.match(p)) ? RegExp.$1 : false ;
        }
    }

    /** @ngInject */
    function ModalRemoveController(current_post, $mdDialog, grupo) {
        var vm = this;

        vm.remove = function() {
          grupo.removePost(current_post.id).then(function(data) {
             $mdDialog.hide(data);
          });
        }

        vm.cancel = function() {
          $mdDialog.cancel();
        }
    }

    /** @ngInject */
    function ParticipantesController(users, ENV){
      var vm = this;

      vm.imageServer = ENV.imageServer;
      vm.users = users;
    }

    /** @ngInject */
    function CropPostImageController($scope, $mdDialog) {
        $scope.myImage='';
        $scope.myCroppedImage='';
        $scope.fileName='';
        var vm = this;

        $scope.resizeImageContainer = function() {
          $scope.imageDirective = "hola";
        }

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
        function ReplyController(current_post, current_account, $mdDialog, $document, current_scope, comment, cover_comment_image, grupo, $q) {
            var vm = this;

            vm.account = current_account;
            vm.post = current_post;

            vm.comment = comment;
            vm.cover_comment_image = cover_comment_image;

            vm.modal_reply = current_scope.modalReply;

            vm.showModalVideoPostDialog = function() {
              $mdDialog.show({
                controller: ModalVideoPostController,
                controllerAs: 'vm',
                templateUrl: 'app/winwin/modal-video-post.tmpl.html',
                clickOutsideToClose:true
              })
              .then(function(video) {
                vm.comment.media_type = 'VIDEO';
                vm.comment.media_path = video;
                $mdDialog.show(vm.modal_reply);
              }, 
              function() {
                $mdDialog.show(vm.modal_reply);
              });
            };

            vm.showCropPostImageDialog = function(ev) {
              $mdDialog.show({
                controller: CropPostImageController,
                templateUrl: 'app/grupo/cover-post-image.tmpl.html',
                parent: angular.element($document.body),
                targetEvent: ev,
                clickOutsideToClose:true
              })
              .then(function(image) {
                vm.comment.media_type = 'IMAGE';
                vm.modal_reply.locals.cover_comment_image = image
                $mdDialog.show(vm.modal_reply);
              }, 
              function() {
                $mdDialog.show(vm.modal_reply);
              });
            };

            vm.submitComment = function() {
              if (vm.comment.content == '' && !vm.comment.media_path && !vm.cover_comment_image) {
                return;
              }

              if (!vm.comment.content) {
                vm.comment.content = '';
              }

              var promises = [];

              if (vm.comment.media_type == 'IMAGE' && vm.cover_comment_image) {
                promises.push(grupo.uploadPostImage(dataURItoBlob(vm.cover_comment_image.file), vm.cover_comment_image.name));
              }

              $q.all(promises).then(function(data) {
                if (vm.cover_comment_image) {
                  vm.comment.media_id = data[0].media_id;
                  vm.comment.media_path = data[0].filename;
                  vm.cover_comment_image = null;
                }

                grupo.createComment(vm.post.id, vm.comment.content, vm.comment.media_id, vm.comment.media_type, vm.comment.media_path)
                .then(function(data){
                  $mdDialog.hide(data);
                  vm.post.comments.push(vm.comment);
                });
              });
            }

            var dataURItoBlob = function(dataURI) {
              var binary = atob(dataURI.split(',')[1]);
              var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
              var array = [];
              for(var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
              }
              return new Blob([new Uint8Array(array)], {type: mimeString});
            };
        }

})();

