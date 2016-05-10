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

            vm.notifications = $window._.sortBy([{"id":1,"user_id":1,"type":"WW_JOIN","subject":"you_have_join_ww_title","body":"you_have_join_ww_title_body","object_id":2,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-26 19:05:42","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-26 19:05:42","updated_at":"2016-04-26 19:05:42"},{"id":2,"user_id":1,"type":"WW_JOIN","subject":"you_have_join_ww_title","body":"you_have_join_ww_title_body","object_id":3,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-26 19:24:15","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-26 19:24:15","updated_at":"2016-04-26 19:24:15"},{"id":3,"user_id":1,"type":"WW_JOIN","subject":"you_have_join_ww_title","body":"you_have_join_ww_title_body","object_id":6,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-26 19:37:46","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-26 19:37:46","updated_at":"2016-04-26 19:37:46"},{"id":4,"user_id":1,"type":"WW_JOIN","subject":"you_have_join_ww_title","body":"you_have_join_ww_title_body","object_id":4,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-26 19:40:06","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-26 19:40:06","updated_at":"2016-04-26 19:40:06"},{"id":5,"user_id":1,"type":"WW_LEFT","subject":"you_have_left_ww_title","body":"you_have_left_ww_title_body","object_id":3,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-26 21:41:05","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-26 21:41:05","updated_at":"2016-04-26 21:41:05"},{"id":6,"user_id":1,"type":"WW_LEFT","subject":"you_have_left_ww_title","body":"you_have_left_ww_title_body","object_id":4,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-26 21:43:04","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-26 21:43:04","updated_at":"2016-04-26 21:43:04"},{"id":7,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":105,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-29 13:53:14","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-29 13:53:14","updated_at":"2016-04-29 13:53:14"},{"id":8,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":106,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-29 15:21:00","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-29 15:21:00","updated_at":"2016-04-29 15:21:00"},{"id":9,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":107,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-04-29 15:27:20","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-04-29 15:27:20","updated_at":"2016-04-29 15:27:20"},{"id":10,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":108,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-03 19:49:03","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-03 19:49:03","updated_at":"2016-05-03 19:49:03"},{"id":11,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":109,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-03 20:14:47","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-03 20:14:47","updated_at":"2016-05-03 20:14:47"},{"id":12,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":110,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-03 20:17:45","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-03 20:17:45","updated_at":"2016-05-03 20:17:45"},{"id":13,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":111,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-03 20:18:13","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-03 20:18:13","updated_at":"2016-05-03 20:18:13"},{"id":14,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":112,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-03 20:44:20","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-03 20:44:20","updated_at":"2016-05-03 20:44:20"},{"id":15,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":113,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-03 21:32:42","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-03 21:32:42","updated_at":"2016-05-03 21:32:42"},{"id":16,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":114,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 15:09:15","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 15:09:15","updated_at":"2016-05-04 15:09:15"},{"id":17,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":115,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 15:17:37","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 15:17:37","updated_at":"2016-05-04 15:17:37"},{"id":18,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":116,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 15:19:30","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 15:19:30","updated_at":"2016-05-04 15:19:30"},{"id":19,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":117,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 18:02:14","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 18:02:14","updated_at":"2016-05-04 18:02:14"},{"id":20,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":118,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 18:13:59","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 18:13:59","updated_at":"2016-05-04 18:13:59"},{"id":21,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":119,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 18:31:58","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 18:31:58","updated_at":"2016-05-04 18:31:58"},{"id":22,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":120,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-04 19:45:02","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-04 19:45:02","updated_at":"2016-05-04 19:45:02"},{"id":23,"user_id":1,"type":"WW_CREATED","subject":"you_have_created_new_ww_title","body":"you_have_created_new_ww_title_body","object_id":121,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":1,"sent_at":"2016-05-06 13:44:36","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-06 13:44:36","updated_at":"2016-05-06 13:44:36"},{"id":24,"user_id":1,"type":"CAMPANADA","subject":"New campanada","body":"Vamo' arriba","object_id":1,"object_type":"Winwins\\Winwin","sender_id":1,"is_read":0,"is_activity":0,"sent_at":"2016-05-09 17:40:26","sent_by_mail":0,"is_mail_sent":0,"created_at":"2016-05-09 17:40:26","updated_at":"2016-05-09 17:40:26"}], function(notification) {
              return -notification.id; 
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
