(function () {
    'use strict';
    angular.module('eliteApp').controller('mainpageinfoctrl', ['$http', 'apictrl', '$scope', mainpageinfoctrl]);
    function mainpageinfoctrl($http, apictrl, $scope) {
        var vm = this;

        apictrl.getmainpagenews().then(function (data) {
           
            vm.news = data;
           
        });

        apictrl.getmainpagearticle().then(function (data) {
            
            vm.article = data;
        });


        apictrl.getmainpagelecture().then(function (data) {
           
            vm.lecture = data;
            $scope.v4 = result.data.Vlocation;
            vm.url = "http://sayedalshohada.azurewebsites.net" + $scope.v4;
           /* var obj = { type: "message2", vurl: vm.url };
            window.postMessage(obj, '*');
            */
            window.postMessage(vm.url, '*');

        });


    };
})();