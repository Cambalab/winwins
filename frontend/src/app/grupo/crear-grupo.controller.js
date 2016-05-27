(function() {
    'use strict';

    angular
        .module('winwins')
        .controller('CrearGrupoController', CrearGrupoController);

    /** @ngInject */
    function CrearGrupoController($stateParams, grupo, winwin, ENV, $mdDialog, $document, $q, $window, $element) {
        var vm = this;
        vm.base = ENV.base;
        vm.imageServer = ENV.imageServer;
        vm.facebookId = ENV.satellizer.facebook.clientId;
        vm.stage = 1;
        vm.emailsOK = false;
        vm.grupo = {};


        vm.clearError = function () {
            if (vm.grupo.terms) {
                vm.crearForm1.terms.$setValidity("notTerms", true);
            }
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
                    vm.grupo.image = data[0].filename;
                }

                grupo.saveGrupo(vm.grupo)
                    .then(function (data) {
                        vm.grupo.id = data.id;
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
    }
    
})();
