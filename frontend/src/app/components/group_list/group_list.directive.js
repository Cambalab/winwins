(function() {
    'use strict';

    angular
        .module('winwins')
        .directive('groupList', groupList);

    /** @ngInject */
    function groupList() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/group_list/group_list.html',
            scope: {
                items: '=',
                title: '=',
                icon: '=',
                scroll: '&onScroll'
            },
            controller: GroupListController,
            controllerAs: 'vm',
            bindToController: true
        };

        return directive;
    }

    /** @ngInject */
    function GroupListController(ENV, $mdDialog, $document) {
        var vm = this;
        vm.imageServer = ENV.imageServer;
    }

})();
