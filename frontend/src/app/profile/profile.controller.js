(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('ProfileController', ProfileController);

  /** @ngInject */
  function ProfileController($window, account, user, $mdDialog, $q, ENV, $state, $auth, $rootScope, $scope, $document, winwin, $log) {
    var vm = this;

    if (!$auth.isAuthenticated()) {
      $state.go('home');
    }

    vm.avatar = '';
    vm.portrait = '';
    vm.imageServer = ENV.imageServer;
    vm.loading = true;

    vm.loadSkills = function(queryText){

      vm.skills = [];

      return user.getSkills(queryText).then(function(skills_data){
        angular.forEach(skills_data, function(skill){
          vm.skills.push({
            id: skill.id,
            text: skill.name
          });
        });

        return vm.skills;
      });

    };

    vm.user = {
      interests_list:[],
      skills_list:[]
    };

    account.getProfile()
    .then(function(data) {
      vm.isActive = data.active;
      
      user.getUser(data.user.id)
      .then(function(user_data) {
        vm.user = user_data;
        vm.is_complete = (user_data.name && user_data.lastname && user_data.email && user_data.birthdate);
        if (vm.user.birthdate) {
          vm.user.birthdate = new Date(user_data.birthdate.toString().replace(/-/g,'/'));
        }
        vm.creadospormi = $window._.filter(vm.user.winwins, function(winwin) {
          return winwin.user_id == vm.user.user_id && winwin.canceled == 0;
        });
        vm.enqueparticipo = $window._.filter(vm.user.winwins, function(winwin) {
          return winwin.user_id != vm.user.user_id && winwin.canceled == 0;
        });

        vm.winwins_length = vm.creadospormi.length + vm.enqueparticipo.length;
        winwin.getInterests().then(function(data) {
          vm.interests = data;
        });

        vm.user.skills_list = user_data.skills;

        vm.loading = false;

        vm.avatar = vm.imageServer+'/smart/'+vm.user.photo;
        vm.portrait = vm.imageServer+'/'+vm.user.cover_photo;
      });
    });

    vm.saveProfile = function() {
      //vm.processing = true;
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
              $scope.profileForm.current_password.$setValidity("currentPasswordWrong", false);
            }
          }
        });


        //vm.processing = false;
      });
    };

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
      });
    };

    vm.showCropCoverDialog = function(ev) {
      $mdDialog.show({
        controller: CropCoverController,
        templateUrl: 'app/profile/cover_crop.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(image) {
        vm.cover_image = image;
        vm.portrait = image.file;
      });
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

  function CropCoverController($scope, $mdDialog) {
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
