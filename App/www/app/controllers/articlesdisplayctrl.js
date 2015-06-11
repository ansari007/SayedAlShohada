(function () {
    'use strict';
    angular.module('eliteApp').controller('articlesdisplayctrl', ['$stateParams', '$http', 'apictrl', articlesdisplayctrl]);
    function articlesdisplayctrl($stateParams, $http, apictrl) {
        var vm = this;
        vm.num = $stateParams.id;

        apictrl.getarticledis().then(function (data) {
            vm.disp = data;
            console.log("mhd", vm.disp);
            console.log("news-number", vm.num);
        });
    };
})();