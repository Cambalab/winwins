(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('MainController', MainController);

  angular
      .module('winwins')
      .directive('scrollTop', function() {
        return {
          restrict: 'A',
          link: function(scope, $elm) {
            $elm.on('click', function() {
              angular.element("body").animate({scrollTop: angular.element("body").offset().top}, "slow");
            });
          }
        };
      });

  angular
      .module('winwins')
      .directive("scroll", function ($window, $document) {
        return function(scope, element, attrs) {
          angular.element($window).bind("scroll", function() {
            scope.boolChangeClass = this.pageYOffset >= 100 && $document[0].body.scrollHeight - this.pageYOffset - $window.innerHeight >= 260;
            scope.$apply();
          });
        };
      });

  /** @ngInject */
  function MainController($timeout,sponsor, ENV, $rootScope, winwin ,miembro, gettextCatalog ,gettext ,$auth ,$mdDialog ,$window ,$document,$sce ,Analytics ,grupo) {
    var vm = this;


    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.imageServer = ENV.imageServer;

    var w = angular.element($window);

    vm.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    vm.showLoginDialog = function(redirect) {
      if (redirect) {
        $rootScope.returnState = {
          state: redirect
        };
      }
      $mdDialog.show({
        controller: 'LoginController',
        controllerAs: 'login',
        templateUrl: 'app/login/login.tmpl.html',
        parent: angular.element($document.body),
        clickOutsideToClose:true
      });
    };

    sponsor.getList(0, (w.width() < 481) ? 3 : 3).then(function(data) {
      vm.sponsors = data;
      vm.sponsorsDestacadosTitle = "SPONSORS DESTACADOS";
    });

    sponsor.getMainList().then(function(data) {
      vm.partners = data;
    });

    winwin.getList(0, 'select', (w.width() < 481) ? 4 : 4).then(function(data) {
      vm.monthWinwin = data[0];
      data.shift();
      vm.destacados = data;
    });

    grupo.getList(0, 3).then(function(data) {
      vm.gruposDestacados = data;
      vm.gruposDestacadosTitle = "GRUPOS DESTACADOS";
    });

    miembro.getList(0, (w.width()<481) ? 6 : 12).then(function(data) {
      vm.miembros = data;
    });

    winwin.getInterests().then(function(data) {
      vm.interests = data;
    });

    vm.isAuthenticated = function() {
      var userIsAuthenticated = $auth.isAuthenticated();
      //TODO acceso global a id de usuario if (userIsAuthenticated) {
      //   Analytics.set('&uid', "test");
      // }
      return userIsAuthenticated;
    };

    vm.loadingDestacados = false;
    vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Destacados'));
    var _filter = 'select'
    var _categories = [];
    vm.doFilter = function(filter) {
      _categories = [];
      _filter = filter;
      vm.loadingDestacados = true;
      winwin.getList(0, filter, 6).then(function(data) {
        switch(filter) {
          case 'select':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Destacados'));
            break;
          case 'popular':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Populares'));
            break;
          case 'last':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins Recientes'));
            break;
          case 'finishing':
            vm.destacadosTitle = gettextCatalog.getString(gettext('Winwins por terminar'));
            break;
          case 'success':
            vm.destacadosTitle  = gettextCatalog.getString(gettext('Winwins concretados'));
            break;
        }
        vm.destacados = data;
        vm.loadingDestacados = false;
      });
    };

    vm.doCategories = function(id) {
      var _index = _categories.indexOf(id);

      if (_index == -1) {
        _categories.push(id);
      } else {
        _categories.splice(_index, 1);
      }

      if (_categories.length == 0) {
        vm.doFilter(_filter);
      } else {
        winwin.getListByCategory(0, _categories.join(','), 6).then(function(data) {
          vm.destacados = data;
        });
      }
    };

    vm.isChecked = function(id) {
      return _categories.indexOf(id) > -1;
    }

    vm.showLoginDialog = function(ev) {
      $mdDialog.show({
        controller: 'LoginController',
        controllerAs: 'login',
        templateUrl: 'app/login/login.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    vm.showVideoDialog = function(ev) {
      $mdDialog.show({
        controller: VideoController,
        controllerAs: 'vm',
        templateUrl: 'app/main/video.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true
      });
    };

    vm.getIframeSrc = function (videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+videoId+'?autoplay=0&controls=0');
    };

    vm.showMoreDetailMonthWinwin = function(ev) {
      $mdDialog.show({
        controller: MonthWinwinMoreDetailController,
        templateUrl: 'app/winwin/ver-mas-detalle.tmpl.html',
        parent: angular.element($document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        locals: {
          winwin: vm.monthWinwin
        }
      });
    }

  }



  /** @ngInject */

  function MonthWinwinMoreDetailController($scope, winwin) {
    $scope.winwin = winwin;
  }

  function VideoController($sce){
    var vm = this;

    vm.getIframeSrc = function (videoId) {
        return $sce.trustAsResourceUrl('https://www.youtube.com/embed/'+videoId+'?autoplay=0');
    };
  }

})();

