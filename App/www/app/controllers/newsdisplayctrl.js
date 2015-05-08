(function () {
    'use strict';
    angular.module('eliteApp').controller('newsdisplayctrl', ['$stateParams', '$http', 'apictrl', newsdisplayctrl]);
    function newsdisplayctrl($stateParams, $http, apictrl) {
        var vm = this;
        vm.num = $stateParams.id;

        apictrl.getmsgdis().then(function (data) {
            vm.disp = data;
            console.log("mhd", vm.disp);
            console.log("news-number", vm.num);
        });
    };
})();