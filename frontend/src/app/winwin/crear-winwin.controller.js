(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('CrearWinwinController', CrearWinwinController);

  /** @ngInject */
  function CrearWinwinController($stateParams, winwin, ENV, $mdDialog, $document, $q) {
    var vm = this;
    vm.imageServer = ENV.imageServer;
		vm.stage = 1; 
		vm.winwin = {
			interests:[]
		};
    
    vm.nexStage = function() {
    	if (!vm.winwin.terms){
        vm.crearForm1.terms.$setValidity("notTerms", false);
        return;
      }
			vm.stage = 2;
    }

    vm.saveWinwin = function() {
      var promises = [];

      if (vm.cover_image) {
        promises.push(winwin.uploadImage(dataURItoBlob(vm.cover_image.file), vm.cover_image.name));
      }

      $q.all(promises).then(function(data) {
        if (vm.cover_image) {
          vm.winwin.image = data[0].filename;
        }

        winwin.saveWinwin(vm.winwin)
        .then(function(){
          vm.stage = 3;
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
    }

   	winwin.getInterests().then(function(data) {
   		vm.interests = data;
 		});

	 	vm.setCategories = function(item) {
   		var _index = -1
			angular.forEach(vm.winwin.interests, function(value, key) {
				if (value.id == item.id) {
			 		_index = key;
				}
			});
	   
	   	if (_index == -1) {
     		vm.winwin.interests.push(item);
	   	} else {
   			vm.winwin.interests.splice(_index, 1);
	   	}
 		};

	 	vm.isChecked = function(id) {
   		var _index = -1
	   	angular.forEach(vm.winwin.interests, function(value, key) {
     		if (value.id == id) {
     			_index = key;
     		}
   		});
	   	return _index > -1;
	 	}

	 	vm.showGaleriaDialog = function(ev) {
      $mdDialog.show({
        controller: ShowGaleriaController,
        templateUrl: 'app/winwin/modal-galeria.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
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
      });
    };
  }

  /** @ngInject */
  function ShowGaleriaController() {
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
