(function () {
    'use strict';

    angular.module('eliteApp').controller('viewlecturectrl', ['$scope', '$stateParams', 'apictrl', '$sce', viewlecturectrl]);

    function viewlecturectrl($scope, $stateParams, apictrl, $sce) {
        console.log("view lecture here");
        var vm = this;
        var local = "http://localhost:1322";
        var online = "http://sayedalshohada.azurewebsites.net";
        var url = local;
        vm.nid = $stateParams.id;

        apictrl.getlecture().then(function (data) {
            vm.lecture = data;
            vm.videourl = url + data.Vlocation;
            window.postMessage(vm.videourl, '*');
            console.log("mhd", vm.lecture);
            console.log("news-number", vm.nid);

        });

       /* vm.makevurl = function (val) {
            return $sce.trustAsResourceUrl(url + val);

        };*/

        console.log("vm.nid", vm.nid);
    };


})();