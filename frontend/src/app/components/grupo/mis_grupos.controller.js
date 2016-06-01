(function() {
    'use strict';

    angular
        .module('winwins')
        .controller('MisGruposController', MisGruposController);

    /** @ngInject */
    function MisGruposController(ENV, user, account) {
        var vm = this;


        // account.getProfile()
        //     .then(function(data) {
        //         vm.isActive = data.active;
        //
        //         user.getUser(data.user.id).then(function(user_data){
        //             vm.user = user_data;
        //         })
        //     })
    }

})();
