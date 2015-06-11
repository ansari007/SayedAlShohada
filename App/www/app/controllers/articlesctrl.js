(function () {
    'use strict';
    angular.module('eliteApp').controller('articlesctrl', ['$http', 'apictrl', '$scope', articlesctrl]);
    function articlesctrl($http, apictrl, $scope) {
        var vm = this;
        vm.loadList = function (forceRefresh) {
            apictrl.getarticles(forceRefresh).then(function (data) {

                vm.news = data;
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        vm.loadList(false);
    };
})();