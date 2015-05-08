(function () {
    'use strict';
    angular.module('eliteApp').controller('lecturectrl', ['$scope', '$stateParams', 'apictrl', '$sce', lecturectrl]);
    function lecturectrl($scope, $stateParams, apictrl, $sce) {
        var vm = this;
        //vm.localhost = "http://Dev-010:59454";
        vm.localhost = "http://sayedalshohada.azurewebsites.net/";
        vm.loadList = function (forceRefresh) {
            apictrl.getlectures(forceRefresh).then(function (data) {
                vm.lectures = data;
                console.log("lecturedata", vm.lectures);
            }).finally(function () {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
        vm.loadList(false);
        vm.nid = $stateParams.id;

        vm.makevurl = function (val) {
            return $sce.trustAsResourceUrl(vm.localhost + val);
        };
        console.log("vm.nid", vm.nid);
    };
})();