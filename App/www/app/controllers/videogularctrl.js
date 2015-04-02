(function () {
    'use strict';

    angular.module('eliteApp').controller('videogularctrl', ['$scope', '$stateParams', 'apictrl', '$sce', videogularctrl]);

    function videogularctrl($scope, $stateParams, apictrl, $sce) {
        console.log("videogular goes here!!!");
        var vm = this;
        vm.localhost = "http://mohammad:59454";
        vm.nid = $stateParams.id;

        this.config = {
            sources: [
                { src: $sce.trustAsResourceUrl("http://localhost:8100/video/123.mp4"), type: "video/mp4" }

            ],
            theme: "../js/bower_components/videogular-themes-default/videogular.css",
            plugins: {
                poster: $sce.trustAsResourceUrl("http://mohammad:59454/SayedAlShohada/pic/videothub.jpg")
            }
        };

        /*"http://www.videogular.com/assets/images/videogular.png"*/
        /*http://mohammad:59454/SayedAlShohada/pic/videothub.jpg*/

        vm.makevurl = function (val) {
            return $sce.trustAsResourceUrl(vm.localhost + val);
        };










    };


})();