(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($mdDialog, $auth, $state, $timeout, account, $rootScope, $log) {
    var vm = this;

    vm.login_status = 'login'

    vm.login = function() {
      $log.log("Se registro un usuario");
      $auth.login({ email: vm.login.email, password: vm.login.password })
      .then(function() {
        $rootScope.$broadcast('account_change');
        complete();
        vm.login_status = 'success';
      })
      .catch(function() {
        vm.login_status = 'error';
      });
    };

    vm.authenticate = function(provider) {
      $log.log("Se autentifico a un usuario");
      $auth.authenticate(provider)
      .then(function() {
        vm.provider = provider;
        $rootScope.$broadcast('account_change');
        complete();
        vm.login_status = 'success';
      })
      .catch(function() {
        vm.login_status = 'error';
      });
    };

    vm.register_status = 'register';

    vm.signup = function() {
      if (!vm.register.terms){
        vm.registerForm.terms.$setValidity("notTerms", false);
        return;
      }
      $auth.signup({
        username: vm.register.name + ' ' + vm.register.lastname,
        lastname: vm.register.lastname,
        email: vm.register.email,
        password: vm.register.password,
        name: vm.register.name,
        language_code: 'ES'
      })
      .then(function() {
        $auth.login({ email: vm.register.email, password: vm.register.password })
        .then(function() {
          $rootScope.$broadcast('account_change');
          complete('home.profile');
          vm.register_status = 'success';
        });
      })
      .catch(function(response) {
        vm.register_status = 'error';
        vm.message = "Error en su registracion";
        if(response.data) {
          if(response.data.message == 'email_already_taken') {
            vm.message = 'El correo ya existe';
          }
        }
      });
    };

    vm.change_pass_status = 'change_pass';

    vm.changePass = function() {
      account.emailResetPass(vm.changePass.email)
      .then(function() {
        vm.change_pass_status = 'success';
      })
      .catch(function(response) {
        vm.change_pass_status = 'error';
      });
    }

    var complete = function(redirect) {
      account.getProfile();
      $timeout(function() {
        $mdDialog.hide();
        if($rootScope.returnState) {
            switch($rootScope.returnState.state) {
              case 'home.winwin': 
                var winwinId = $rootScope.returnState.parameters.winwinId;
                $rootScope.returnState = null;
                $state.go('home.winwin', {
                    winwinId: winwinId
                 }); 
                break;
              case 'home.crear-winwin':
                $rootScope.returnState = null;
                $state.go('home.crear-winwin');
                break;
              default:
                $rootScope.returnState = null;
                $state.go('home'); 
            }
        } else {
          if (redirect) {
            $state.go(redirect);
          } 
        }
      }, 3000);
    };
  }

  angular
    .module('winwins')
    .directive('passwordVerify', passwordVerify);

    /** @ngInject */
  function passwordVerify() {
    $log.log("Se verifico el pass");
    var directive = {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
          var combined;

          if (scope.passwordVerify || ctrl.$viewValue) {
            combined = scope.passwordVerify + '_' + ctrl.$viewValue;
          }
          return combined;
        }, function(value) {
          if (value) {
            ctrl.$parsers.unshift(function(viewValue) {
              var origin = scope.passwordVerify;
              if (origin !== viewValue) {
                ctrl.$setValidity("passwordVerify", false);
                return undefined;
              } else {
                ctrl.$setValidity("passwordVerify", true);
                return viewValue;
              }
            });
          }
        });
      }
    };
    return directive;
  }

})();
