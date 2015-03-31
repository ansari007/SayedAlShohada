(function () {
    'use strict';

    angular.module('eliteApp').factory('apictrl', ['$stateParams','$http','$q','DSCacheFactory','$ionicLoading','$timeout',apictrl]);

    function apictrl($stateParams,$http,$q,$ionicLoading,$timeout,DSCacheFactory) {
        var vm = this;
vm.num=$stateParams.id;


function getmsgs(){

    var deferred=$q.defer();
    $ionicLoading.show({template:"Loading..."});
$http.get("http://localhost:59454/api/Messages").success(function(data){

    $timeout(function(){
        $ionicLoading.hide();
         deferred.resolve(data);
        
    }, 500);
    console.log("ok",data,status);

    

})
.error(function(){
    $ionicLoading.hide();
console.log("error http mhd");
deferred.reject();
});

return deferred.promise;

}



function getmsgdis(){
    $ionicLoading.show({template:"Loading..."});
    var deferred=$q.defer();
$http.get("http://localhost:59454/api/Messages/"+vm.num+"").success(function(data){

    $timeout(function(){
        $ionicLoading.hide();
         deferred.resolve(data);
        
    }, 500);
  

})
.error(function(){
console.log("error http mhd");
deferred.reject();
});
return deferred.promise;

}

// ----------------------------------------lecturectrl


function getlectures(){
    
$ionicLoading.show({template:"Loading..."});

    var deferred=$q.defer();
$http.get("http://localhost:59454/api/Values").success(function(data){

   $timeout(function(){
        $ionicLoading.hide();
         deferred.resolve(data);
        
    }, 500);

})
.error(function(){
    $ionicLoading.hide();
console.log("error http valuesctrl");
deferred.reject();
});

return deferred.promise;

}









return{
getmsgs: getmsgs,
getmsgdis: getmsgdis,
getlectures: getlectures

};





    };


})();