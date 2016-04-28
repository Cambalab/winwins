(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('CrearWinwinController', CrearWinwinController);

  /** @ngInject */
  function CrearWinwinController($stateParams, winwin, ENV, $mdDialog, $document) {
    var vm = this;
    vm.imageServer = ENV.imageServer;
		vm.stage = 1; 
		vm.winwin = {
			interests:[]
		};
    
    vm.nexStage = function() {
			vm.stage = 2;
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
