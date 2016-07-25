(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('WinwinController', WinwinController);

  /** @ngInject */
  function WinwinController($stateParams, winwin, ENV, $mdDialog, $document, $sce, account, $auth, $rootScope, $window, $q, user, sponsor) {
    var vm = this;

    vm.base = ENV.base;
    vm.imageServer = ENV.imageServer;
    vm.facebookId = ENV.satellizer.facebook.clientId;

    vm.winwinId = $stateParams.winwinId;
    vm.showFirstPostModal = $stateParams.showFirstPostModal;

    vm.post = {};
    vm.postInputFocus = false;

    account.getProfile().then(function(data) {
      vm.account = data.profile;

      vm.campanadas = $window._.filter(data.user.notifications, function(notification) {
        return notification.type == "CAMPANADA" && notification.object_id == vm.winwinId; 
      });
    });

    winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
      vm.winwin = winwin_data;
      vm.winwin.closing_date = new Date(vm.winwin.closing_date);
      vm.polls = vm.winwin.polls;

      $window._.each(vm.polls, function(poll) {
        winwin.getPoll(poll.id).then(function(data) {
          poll.data = data;
        });
      });
      
      // sponsor.getListByWinwin(vm.winwinId).then(function(sponsor_data) {
      //   vm.sponsors = $window._.filter(sponsor_data, function(model) {
      //     return model.pivot.ww_accept == 1 && model.pivot.sponsor_accept == 1;
      //   });  
      // });

      sponsor.getList().then(function(sponsor_data) {
        vm.sponsors = sponsor_data;
      });

      vm.post = {content: '', reference_id: winwin_data.id, type: 'WINWIN'};
      if (vm.showFirstPostModal) {
        $mdDialog.show({
          controller: FirstPostModalController,
          controllerAs: 'vm',
          templateUrl: 'app/winwin/modal-first-post.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose: true,
          locals: {
            winwinName: winwin_data.title
          }            
        }).then(function(){
          var postInput = $window.document.getElementById("post-input-focus");
          if (postInput) {
            postInput.focus();
          }
        });
      }
    });

    winwin.getPosts(vm.winwinId).then(function(posts_data) {
      vm.posts = posts_data.posts;
    });

    vm.submitPost = function() {
      if (vm.post.content == '' && !vm.post.media_path && !vm.cover_post_image) {
        return;
      }

      var promises = [];

      if (vm.post.media_type == 'IMAGE' && vm.cover_post_image) {
        promises.push(winwin.uploadPostImage(dataURItoBlob(vm.cover_post_image.file), vm.cover_post_image.name));
      }

      $q.all(promises).then(function(data) {
        if (vm.cover_post_image) {
          vm.post.media_id = data[0].media_id;
          vm.post.media_path = data[0].filename;
          vm.cover_post_image = null;
        }

        winwin.createPost(vm.post)
        .then(function(data){
          if (!vm.winwin.published && !vm.winwin.canceled) {
            winwin.activate(vm.winwinId).then(function() {
              vm.winwin.published = true;
            });
          }

          winwin.getPosts(vm.winwinId).then(function(posts_data) {
            vm.posts = posts_data.posts;
          });
          vm.post = {content: '', reference_id: vm.winwinId, type: 'WINWIN'}
        });
      });
    };

    vm.reportWinwin = function() {
      $mdDialog.show({
        controller: ReportController,
        controllerAs: 'vm',
        templateUrl: 'app/reports/modal_confirm_send_report.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose: true,
        locals: {
          winwinId: vm.winwinId
        }            
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

    vm.join = function() {
      if($auth.isAuthenticated()) {
        winwin.join(vm.winwinId).then(function(data) {
          winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
            vm.winwin = winwin_data;
            vm.winwin.closing_date = new Date(vm.winwin.closing_date);
            vm.winwin.already_joined = true;
          });
          
          $mdDialog.show({
            controller: ModalConfirmacionSumarseController,
            controllerAs: 'vm',
            templateUrl: 'app/winwin/modal-confirmacion-sumarse.tmpl.html',
            parent: angular.element($document.body),
            clickOutsideToClose:true,
            locals: {
              current_winwin: vm.winwin
            }
          });
        });
      } else {
        $rootScope.returnState = {
          state: 'home.winwin',
          parameters: {
              winwinId: vm.winwin.id
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

    vm.showGroupsModal = function() {
      winwin.getGroups(vm.winwinId).then(function(groups_data){
          vm.grupos = groups_data;
          account.getProfile().then(function(data) {
            vm.user_id = data.profile.id;                
              user.getUser(data.user.id).then(function(user_data){
                vm.user_groups = user_data.groups;
                $mdDialog.show({
                    controller: ModalBindWinwinToGroup,
                    controllerAs: 'vm',
                    templateUrl: 'app/grupo/modal-vincular-grupo-a-winwin.tmpl.html',
                    parent: angular.element($document.body),
                    clickOutsideToClose: true,
                    locals: {
                        group_list: vm.grupos,
                        user_groups: vm. user_groups,
                        winwin_id: vm.winwinId
                    }
                });
              });
          });              
      });
    }

    vm.left = function() {
      $mdDialog.show({
        controller: ModalAbandonarController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-abandonar.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_winwin: vm.winwin
        }
      })
      .then(function(data) {
        winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
          vm.winwin = winwin_data;
          vm.winwin.closing_date = new Date(vm.winwin.closing_date);
        });
      });
    }

    vm.close = function() {
      $mdDialog.show({
        controller: ModalCloseController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-close.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_winwin: vm.winwin
        }
      })
      .then(function(data) {
        winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
          vm.winwin = winwin_data;
          vm.winwin.closing_date = new Date(vm.winwin.closing_date);
        });
      });
    }

    vm.vote = function(post, positive) {
      winwin.votePost(post.id, positive).then(function() {
        winwin.getPosts(vm.winwinId).then(function(posts_data) {
          vm.posts = posts_data.posts;
        });
      });
    };

    vm.setSticky = function(post, sticky) {
      winwin.stickyPost(post.id, sticky).then(function() {
        winwin.getPosts(vm.winwinId).then(function(posts_data) {
          vm.posts = posts_data.posts;
        });
      });
    };

    vm.removePost = function(post) {
      $mdDialog.show({
        controller: ModalRemoveController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-remove.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_post: post
        }
      })
      .then(function(data) {
        winwin.getPosts(vm.winwinId).then(function(posts_data) {
          vm.posts = posts_data.posts;
        });
      });
    };

    vm.votePoll = function(poll) {
      winwin.votePoll(poll).then(function() {
        $window._.each(vm.polls, function(poll) {
          winwin.getPoll(poll.id).then(function(data) {
            poll.data = data;
          });
        });
      });
    }

    vm.removePoll = function(poll, index) {
      winwin.removePoll(poll.id).then(function() {
        vm.polls.splice(index, 1);
      });
    }

    vm.percentage_votes = function(poll, answer) {
      if(!poll.data.total_votes) {
        return 0;
      }
      var result = (answer.vote_count * 100 / poll.data.total_votes);
      return result;
    };

    vm.showCampanadasDialog = function() {
      $mdDialog.show({
        controller: CampanadasController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-campanadas.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          campanadas: vm.campanadas
        }
      });
    }
    
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
        winwin.getPosts(vm.winwinId).then(function(posts_data) {
          vm.posts = posts_data.posts;
        });
      });
    };

    vm.showMasDetalleDialog = function(ev) {
      $mdDialog.show({
        controller: MasDetalleController,
        templateUrl: 'app/winwin/ver-mas-detalle.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          winwin: vm.winwin
        }
      });
    };

    vm.showModalVideoPostDialog = function(ev) {
      $mdDialog.show({
        controller: ModalVideoPostController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-video-post.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(video) {
        vm.post.media_type = 'VIDEO';
        vm.post.media_path = video;
      });
    };

    vm.showModalShareEmailDialog = function() {
      $mdDialog.show({
        controller: ModalShareEmailController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-share-email.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_winwin: vm.winwin
        }
      });
    }

    vm.showModalPollDialog = function() {
      $mdDialog.show({
        controller: ModalPollController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-poll.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_winwin: vm.winwin
        }
      })
      .then(function(data) {
        vm.polls.push(data);
        $window._.each(vm.polls, function(poll) {
          winwin.getPoll(poll.id).then(function(data) {
            poll.data = data;
          });
        });
      });
    }
    
    vm.showParticipantesDialog = function(ev) {
      $mdDialog.show({
        controller: ParticipantesController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/participantes.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          users: vm.winwin.users,
          winwin_id: vm.winwin.id,
          is_moderator: vm.winwin.is_moderator
        }
      })
      .then(null, function(){
        winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
          vm.winwin = winwin_data;
        });
      });
    };

    vm.showCropPostImageDialog = function(ev) {
      $mdDialog.show({
        controller: CropPostImageController,
        templateUrl: 'app/winwin/cover_post_image.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(image) {
        vm.post.media_type = 'IMAGE';
        vm.cover_post_image = image;
      });
    };

    vm.showSharePost = function(post) {
      $mdDialog.show({
        controller: ModalSharePostController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-share-post.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true,
        locals: {
          current_post: post
        }
      });
    }
  }

  /** @ngInject */
  function ModalSharePostController(current_post, ENV) {
    var vm = this;

    vm.base = ENV.base;
    vm.imageServer = ENV.imageServer;
    vm.facebookId = ENV.satellizer.facebook.clientId;
    vm.post = current_post;
  }

  /** @ngInject */
  function MasDetalleController($scope, winwin) {
    $scope.winwin = winwin;
  }
  
  /** @ngInject */
  function ParticipantesController(users, winwin_id, ENV, winwin, is_moderator){
    var vm = this;

    vm.imageServer = ENV.imageServer;
    vm.users = users;
    vm.normal_success = false;
    vm.activator_success = false;
    vm.is_moderator = is_moderator;

    vm.makeNormal = function(participante, index) {
      vm.activated_name = participante.username;
      winwin.setUserNormal(winwin_id, participante.id).then(function(data){
        vm.normal_success = true;
        vm.users[index].pivot.moderator = false;
      });
    };

    vm.makeActivator = function(participante, index) {
      vm.activated_name = participante.username;
      winwin.setUserActivator(winwin_id, participante.id).then(function(data){
        vm.activator_success = true;
        vm.users[index].pivot.moderator = true;
      });
    };
  }

  /** @ngInject */
  function CampanadasController(campanadas){
    var vm = this;

    vm.campanadas = campanadas;
  }

  angular
    .module('winwins')
    .filter('moment', function(moment) {
      return function(dateString, format) {
        return moment(dateString).format(format);
      };
  });

  /** @ngInject */
  function ReplyController(current_post, current_account, $mdDialog, $document, current_scope, comment, cover_comment_image, winwin, $q) {
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
        templateUrl: 'app/winwin/cover_post_image.tmpl.html',
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
        promises.push(winwin.uploadPostImage(dataURItoBlob(vm.cover_comment_image.file), vm.cover_comment_image.name));
      }

      $q.all(promises).then(function(data) {
        if (vm.cover_comment_image) {
          vm.comment.media_id = data[0].media_id;
          vm.comment.media_path = data[0].filename;
          vm.cover_comment_image = null;
        }

        winwin.createComment(vm.post.id, vm.comment.content, vm.comment.media_id, vm.comment.media_type, vm.comment.media_path)
        .then(function(data){
          $mdDialog.hide(data);
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
    
  /** @ngInject */
  function ModalConfirmacionSumarseController($timeout, current_winwin, ENV, winwin) {
    var vm = this;

    vm.base = ENV.base;
    vm.imageServer = ENV.imageServer;
    vm.facebookId = ENV.satellizer.facebook.clientId;
    vm.status = 'success';
    vm.winwin = current_winwin;
    vm.emailsOK = false;

    vm.mails = [];

    $timeout(function() {
      vm.status = 'share';
    }, 3000);

    vm.validateMail = function(chip) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(chip))
      {
        var index = vm.mails.indexOf(chip);
        vm.mails.splice(index, 1);
      }
    }

    vm.sentInvitations = function() {
      winwin.shareMails(vm.winwin.id, vm.mails).then(function() {
        vm.mails = [];
        vm.emailsOK = true;
      });
    }
  }

  /** @ngInject */
  function ModalShareEmailController(current_winwin, winwin) {
    var vm = this;

    vm.winwin = current_winwin;
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
      if (vm.mails.length==0 && vm.mail) {
        vm.mails.push(vm.mail);
        vm.validateMail(vm.mail)
        vm.mail = '';
      }
      winwin.shareMails(vm.winwin.id, vm.mails).then(function() {
        vm.mails = [];
        vm.emailsOK = true;
      });
    }
  }

  /** @ngInject */
  function ModalAbandonarController(current_winwin, $mdDialog, winwin) {
    var vm = this;

    vm.left = function() {
      winwin.left(current_winwin.id).then(function(data) {
         $mdDialog.hide(data);
      });
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    }
  }

  /** @ngInject */
  function FirstPostModalController($mdDialog, winwinName) {
    var vm = this;
    vm.winwinName = winwinName;
  }

  /** @ngInject */
  function ModalCloseController(current_winwin, $mdDialog, winwin) {
    var vm = this;

    vm.close = function() {
      winwin.close(current_winwin.id, vm.reason).then(function(data) {
         $mdDialog.hide(data);
      });
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    }
  }

  /** @ngInject */
  function ModalRemoveController(current_post, $mdDialog, winwin) {
    var vm = this;

    vm.remove = function() {
      winwin.removePost(current_post.id).then(function(data) {
         $mdDialog.hide(data);
      });
    }

    vm.cancel = function() {
      $mdDialog.cancel();
    }
  }

    /** @ngInject */
   function ModalBindWinwinToGroup($mdDialog, group_list, user_groups, $window, winwin_id, grupo) {
        var vm = this;
        vm.group_list = group_list;
        vm.winwin_groups;
        vm.user_groups = user_groups;
        vm.groups_already_added = group_list;
        vm.success = false;
        vm.winwin_id = winwin_id;
        vm.user_have_groups = vm.user_groups.length == 0 ? false : true;
        vm.not_added_user_groups = $window._.filter(vm.user_groups, function(user_group){
            
            var isGroupInList = $window._.filter(vm.groups_already_added, function(group_already_added){
                return user_group.id == group_already_added.id;
            })

            return isGroupInList.length == 0;
        });

        vm.addWinwinToGroup = function(grupoId) {
            grupo.addWinwin(grupoId, vm.winwin_id).then(function(){
                vm.success = true;
            })
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
  function ModalPollController(winwin, current_winwin, $mdDialog, $timeout) {
    var vm = this;
    vm.poll = {};
    vm.pollOk = false
    vm.poll.selected = false;

    vm.submitPoll = function() {
      winwin.createPoll(current_winwin.id, vm.poll).then(function(data) {
        vm.pollOk = true;
        $timeout(function() {
          $mdDialog.hide(data);  
        }, 3000);
      });
    }
  }

  /** @ngInject */
  function ReportController(winwin, winwinId) {
    var vm = this;

    vm.report = {};
    vm.report.winwinId = winwinId;
    vm.report.type = "WINWIN";
    vm.reportSuccess = false;

    vm.sendReport = function(){
      winwin.reportWinwin(vm.report).then(function(){
        vm.reportSuccess = true;
      })
    };
  }

  /** @ngInject */
  function CropPostImageController($scope, $mdDialog) {
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
  
})();
