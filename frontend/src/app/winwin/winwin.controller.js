(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('WinwinController', WinwinController);

  /** @ngInject */
  function WinwinController($stateParams, winwin, ENV, $mdDialog, $document, $sce, account, $auth, $rootScope, $window, $q) {
    var vm = this;

    vm.base = ENV.base;
    vm.imageServer = ENV.imageServer;
    vm.facebookId = ENV.satellizer.facebook.clientId;

    vm.winwinId = $stateParams.winwinId;

    vm.post = {};

    account.getProfile().then(function(data) {
       vm.account = data.profile;
    });

    winwin.getWinwin(vm.winwinId).then(function(winwin_data) {
      vm.winwin = winwin_data;
      vm.winwin.closing_date = new Date(vm.winwin.closing_date);
      vm.sponsors = $window._.filter(vm.winwin.sponsors, function(model) {
        return model.pivot.ww_accept == 1 && model.pivot.sponsor_accept == 1;
      });

      vm.post = {content: '', reference_id: winwin_data.id, type: 'WINWIN'}
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
    
    vm.showParticipantesDialog = function(ev) {
      $mdDialog.show({
        controller: ParticipantesController,
        templateUrl: 'app/winwin/participantes.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          users: vm.winwin.users
        }
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
  }

  /** @ngInject */
  function MasDetalleController($scope, winwin) {
    $scope.winwin = winwin;
  }
  
  /** @ngInject */
  function ParticipantesController($scope, users, ENV){
    $scope.imageServer = ENV.imageServer;
    $scope.users = users;
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
