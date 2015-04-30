(function () {
    'use strict';
    angular.module('eliteApp').controller('newsctrl', ['$http', 'apictrl', '$scope', newsctrl]);
    function newsctrl($http, apictrl, $scope) {
        var vm = this;
        vm.loadList = function (forceRefresh) {
            apictrl.getmsgs(forceRefresh).then(function (data) {
                alert("ok");
                vm.news = data;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        vm.loadList(false);
    };
})();