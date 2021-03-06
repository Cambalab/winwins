(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('CrearWinwinController', CrearWinwinController);

  /** @ngInject */
  function CrearWinwinController($stateParams, winwin, ENV, $mdDialog, $document, $q, $window, $element) {
    var vm = this;
    vm.base = ENV.base;
    vm.imageServer = ENV.imageServer;
    vm.facebookId = ENV.satellizer.facebook.clientId;
    vm.stage = 1; 
    vm.emailsOK = false;

    vm.mails = [];

    vm.winwin = {
      interests:[],
      scope: 'GLOBAL'
    };
    
    vm.nexStage = function() {
      if (!vm.winwin.terms){
        vm.crearForm1.terms.$setValidity("notTerms", false);
        return;
      }
      vm.stage = 2;

      vm.setup_geo_component();
    }

    vm.setup_geo_component = function () {
        var input = $element.find('#winwin_location'),
        options = {
            types: []
        };
        var searchBox = new $window.google.maps.places.Autocomplete(input[0], options);

        searchBox.addListener('place_changed', function() {
            var place = searchBox.getPlace();
            vm.winwin.location = $window._.extend(place, {
                coordinates: place.geometry.location.toJSON()
            });
        });
    };

    vm.saveWinwin = function() {
      if (!vm.winwin.location && vm.winwin.scope == 'LOCAL'){
        vm.crearForm2.winwin_location.$setValidity("notLocation", false);
        return;
      }

      var promises = [];

      if (vm.cover_image) {
        promises.push(winwin.uploadImage(dataURItoBlob(vm.cover_image.file), vm.cover_image.name));
      }

      $q.all(promises).then(function(data) {
        if (vm.cover_image) {
          vm.winwin.image = data[0].filename;
        }

        winwin.saveWinwin(vm.winwin)
        .then(function(data){
          vm.stage = 3;
          vm.winwin.id = data.id;
        });

        vm.processing = false;
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

    vm.clearError = function() {
      if (vm.winwin.terms) {
        vm.crearForm1.terms.$setValidity("notTerms", true);
      }
      if (vm.crearForm2.winwin_location.$error.notLocation){
        vm.winwin.location = null;
        vm.crearForm2.winwin_location.$setValidity("notLocation", true);
      }
    }

    winwin.getInterests().then(function(data) {
      vm.interests = data;
    });

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

    vm.showGaleriaDialog = function(ev) {
      $mdDialog.show({
        controller: ShowGaleriaController,
        controllerAs: 'vm',
        templateUrl: 'app/winwin/modal-galeria.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          image_gallery_selected: vm.winwin.image
        }
      })
      .then(function(image) {
        vm.winwin.image = image;
        vm.preview_image = vm.imageServer + '/smart/' + image;
        vm.cover_image = null;
        vm.winwin.video = null;
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
        vm.winwin.video = video;
        vm.preview_image = 'http://img.youtube.com/vi/'+video+'/hqdefault.jpg';
        vm.cover_image = null;
        vm.winwin.image = null;
      });
    };

    vm.showCropCoverDialog = function(ev) {
      $mdDialog.show({
        controller: CropCoverController,
        templateUrl: 'app/winwin/cover_crop.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      })
      .then(function(image) {
        vm.cover_image = image;
        vm.preview_image = image.file;
        vm.winwin.video = null;
        vm.winwin.image = null;
      });
    };
  }

  /** @ngInject */
  function ShowGaleriaController($mdDialog, image_gallery_selected) {
    var vm = this;

    vm.image_gallery_selected = image_gallery_selected;

    vm.setImage = function(image) {
      $mdDialog.hide(image);
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
