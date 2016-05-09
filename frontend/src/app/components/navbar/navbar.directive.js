(function() {
  'use strict';

  angular
    .module('winwins')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, $mdSidenav, $rootScope, ENV, $auth, account, $mdDialog, $document, user, $window) {
      var vm = this;

      vm.imageServer = ENV.imageServer;
      
      vm.sentActivationMail = false;

      vm.isAuthenticated = function() {
        return $auth.isAuthenticated();
      };

      var event1 = $rootScope.$on('account_change',function(event){
        if (vm.isAuthenticated) {
          account.getProfile()
          .then(function(data) {
            vm.account = data.profile;
            vm.account.email = data.user.email;
            vm.isActive = data.active;

            vm.notifications = $window._.sortBy(data.user.notifications, function(notification) {
              return notification.id; 
            });
          });
        }
      });

      $rootScope.$broadcast('account_change');

      vm.openLeftMenu = function() {
        $mdSidenav('left').toggle();
      };

      // "vm.creation" is avaible by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow();

      vm.onChange = function(event, state) {
        var es = ENV.availableLangs[0];
        var en =  ENV.availableLangs[1];
        var args = ((state === true)? en : es);
        $rootScope.$emit(event, args);
      };

      vm.logout = function () {
        $auth.logout();
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

      vm.showNotificationsDialog = function() {
        $mdDialog.show({
          controller: 'NotificationController',
          controllerAs: 'vm',
          templateUrl: 'app/components/notification/notifications.tmpl.html',
          parent: angular.element($document.body),
          clickOutsideToClose:true,
          locals: {
            notifications: vm.notifications
          }
        });
      };

      vm.resendActivationMail = function() {
        user.resendActivationMail()
        .then(function() {
          vm.sentActivationMail = true;
        });
      };
    }
  }

})();
