(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeHighlighted', acmeHighlighted);


      /** @ngInject */
  function acmeHighlighted() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/highlighted/highlighted.html',
      scope: {
        items: '=',
        title: '=',
        icon: '=',
        viewmore: '=',
        loading: '=',
        showDescription: '='


      },
      controller: HighlightedController,
      controllerAs: 'vm',
      bindToController: true,
      compile: function(element, attrs) {
        if (!attrs.showDescription) {
          attrs.showDescription = true;
        }
      }
    };

    return directive;

    /** @ngInject */
    function HighlightedController(ENV, $mdDialog, $document) {
      var vm = this;
      vm.imageServer = ENV.imageServer;

      vm.share = function(winwin) {
        $mdDialog.show({
          controller: ModalShareController,
          controllerAs: 'vm',
          templateUrl: 'app/components/highlighted/modal-share.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true,
          locals: {
            current_winwin: winwin
          }
        });
      }
    }

    /** @ngInject */
    function ModalShareController(current_winwin, ENV) {
      var vm = this;

      vm.base = ENV.base;
      vm.imageServer = ENV.imageServer;
      vm.facebookId = ENV.satellizer.facebook.clientId;
      vm.winwin = current_winwin;
    }
  }

})();
