(function () {
    'use strict';

    angular.module('eliteApp').controller('viewlecturectrl', ['$scope','$stateParams','apictrl','$sce', viewlecturectrl]);

    function viewlecturectrl($scope,$stateParams,apictrl,$sce) {
      console.log("view lecture here");
        var vm = this;
        vm.localhost="http://mohammad:59454";
         vm.nid=$stateParams.id;

         apictrl.getlecture().then(function(data){
  vm.lecture = data;
  console.log("mhd",vm.lecture);
   console.log("news-number",vm.nid);




})

  




vm.makevurl=function(val){
  return  $sce.trustAsResourceUrl(vm.localhost+val);
  
};

console.log("vm.nid",vm.nid);




       

        

    };


})();