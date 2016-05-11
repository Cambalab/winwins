(function() {
  'use strict';

  angular
    .module('winwins')
    .controller('PublicProfileController', PublicProfileController);

  /** @ngInject */
  function PublicProfileController(user, ENV, $document, winwin, $stateParams) {
    var vm = this;

    vm.userId = $stateParams.userId;
    vm.imageServer = ENV.imageServer;
    vm.user = {interests_list:[]};

    vm.is_public = true;

    user.getUser(vm.userId)
    .then(function(user_data) {
      vm.user = user_data;
      vm.is_complete = (user_data.name && user_data.lastname && user_data.email && user_data.birthdate);
      if (vm.user.birthdate) {
        vm.user.birthdate = new Date(vm.user.birthdate);
      }
      winwin.getInterests().then(function(data) {
        vm.interests = data;
      });
    });

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
