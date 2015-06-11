(function () {
    'use strict';

    angular.module('eliteApp').controller('videogularctrl', ['$scope', '$stateParams', 'apictrl', '$sce','$http', videogularctrl]);

    function videogularctrl($scope, $stateParams, apictrl, $sce,$http) {
        console.log("videogular goes here!!!");
        var vm = this;

        var local = "http://localhost:1322/";
        var online = "http://sayedalshohada.azurewebsites.net/";
        var url = online;
      
        vm.nid = $stateParams.id;
        $http.get('/api/Lectures/Getlec/' + $scope.idv).then(function(result) {
            $scope.v4 = result.data.Vlocation;
            console.log($scope.v4 + "v4loc");

        });
    
        vm.url = url+$scope.v4;

        window.postMessage(vm.url, '*');

     /*   vm.makevurl = function (val) {
            return $sce.trustAsResourceUrl(vm.localhost + val);
        };
*/









    };


})();