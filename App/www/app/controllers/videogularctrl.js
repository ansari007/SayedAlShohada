(function () {
    'use strict';

    angular.module('eliteApp').controller('videogularctrl', ['$scope', '$stateParams', 'apictrl', '$sce', videogularctrl]);

    function videogularctrl($scope, $stateParams, apictrl, $sce) {
        console.log("videogular goes here!!!");
        var vm = this;
        vm.localhost = "http://mohammad:59454";
        vm.nid = $stateParams.id;

        vm.url = "http://mohammad:59454/SayedAlShohada/video/123.mp4";
        window.postMessage(vm.url, '*');
        /*"http://www.videogular.com/assets/images/videogular.png"
        http://mohammad:59454/SayedAlShohada/video/123.mp4
        */
        /*http://mohammad:59454/SayedAlShohada/pic/videothub.jpg
        */

        vm.makevurl = function (val) {
            return $sce.trustAsResourceUrl(vm.localhost + val);
        };










    };


})();