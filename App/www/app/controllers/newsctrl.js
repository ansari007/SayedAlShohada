
(function () {
    'use strict';

    angular.module('eliteApp').controller('newsctrl', ['$http','apictrl', newsctrl]);

    function newsctrl($http,apictrl) {
        var vm = this;

apictrl.getmsgs().then(function(data){
  vm.news = data;
  console.log("mhd",vm.news);
 


})



    };


})();