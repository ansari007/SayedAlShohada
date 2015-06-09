(function () {
    'use strict';
    angular.module('eliteApp').controller('mainpageinfoctrl', ['$http', 'apictrl', '$scope', mainpageinfoctrl]);
    function mainpageinfoctrl($http, apictrl, $scope) {
        var vm = this;
        var local = "http://localhost:1322";
        var online = "http://sayedalshohada.azurewebsites.net";
        var url = local;
        apictrl.getmainpagenews().then(function (data) {
           
            vm.news = data;
           
        });

        apictrl.getmainpagearticle().then(function (data) {
            
            vm.article = data;
        });


        apictrl.getmainpagelecture().then(function (data) {
           
            vm.lecture = data;
            $scope.v4 = result.data.Vlocation;
            vm.url = url+ $scope.v4;
           /* var obj = { type: "message2", vurl: vm.url };
            window.postMessage(obj, '*');
            */
            window.postMessage(vm.url, '*');

        });


    };
})();