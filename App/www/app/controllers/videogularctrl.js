(function () {
    'use strict';

    angular.module('eliteApp').controller('videogularctrl', ['$scope', '$stateParams', 'apictrl', '$sce','$http', videogularctrl]);

    function videogularctrl($scope, $stateParams, apictrl, $sce,$http) {
        console.log("videogular goes here!!!");
        var vm = this;
       // vm.localhost = "http://Dev-010:59454";
        vm.localhost = "http://sayedalshohada.azurewebsites.net/";
        vm.nid = $stateParams.id;
        $http.get('/api/Lectures/Getlec/' + $scope.idv).then(function(result) {
            $scope.v4 = result.data.Vlocation;
            console.log($scope.v4 + "v4loc");

        });
        //vm.url = "http://Dev-010:59454/SayedAlShohada/video/123.mp4";
        //vm.url = "http://sayedalshohada.azurewebsites.net/video/123.mp4";
        vm.url = "http://sayedalshohada.azurewebsites.net"+$scope.v4;

        window.postMessage(vm.url, '*');

        vm.makevurl = function (val) {
            return $sce.trustAsResourceUrl(vm.localhost + val);
        };










    };


})();