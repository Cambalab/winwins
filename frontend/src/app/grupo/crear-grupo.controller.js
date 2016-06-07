(function() {
    'use strict';

    angular
        .module('winwins')
        .controller('CrearGrupoController', CrearGrupoController);

    /** @ngInject */
    function CrearGrupoController($stateParams, grupo, winwin, ENV, $mdDialog, $document, $q, $window, $element, $state) {
        var vm = this;
        vm.base = ENV.base;
        vm.imageServer = ENV.imageServer;
        vm.facebookId = ENV.satellizer.facebook.clientId;
        vm.stage = 1;
        vm.emailsOK = false;
        vm.grupo = {};


        vm.clearError = function () {
            if (vm.grupo.terms) {
                vm.crearForm.terms.$setValidity("notTerms", true);
            }
        }

        vm.nextStage = function() {
            if (!vm.grupo.terms){
                vm.crearForm.terms.$setValidity("notTerms", false);
                return;
            }
            vm.stage = 2;
        }

        vm.saveGrupo = function () {

            if (!vm.grupo.terms) {
                vm.crearForm.terms.$setValidity("notTerms", false);
                return;
            }

            var promises = [];

            if (vm.cover_image) {
                promises.push(grupo.uploadImage(dataURItoBlob(vm.cover_image.file), vm.cover_image.name));
            }

            $q.all(promises).then(function (data) {
                if (vm.cover_image) {
                    vm.grupo.photo = data[0].filename;
                }

                grupo.saveGrupo(vm.grupo)
                    .then(function (data) {
                        vm.grupo.id = data.id;
                            $state.go('home.grupo-profile', {
                              groupId: vm.grupo.id
                            });
                    });
            });
        }

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
                    vm.grupo.video = null;
                    vm.grupo.image = null;
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
