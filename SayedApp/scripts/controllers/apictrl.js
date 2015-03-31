(function () {
    'use strict';

    angular.module('eliteApp').factory('apictrl', ['$ionicLoading','$stateParams','$http','$q','DSCacheFactory',apictrl]);

    function apictrl($ionicLoading,$stateParams,$http,$q,DSCacheFactory) {
        

                
self.MessagesCache = DSCacheFactory.get("MessagesCache");
self.MessagedispCache = DSCacheFactory.get("MessagedispCache");
self.LecturesCache=DSCacheFactory.get("LecturesCache");
self.staticCache=DSCacheFactory.get("staticCache");

// ===============================================
self.MessagesCache.setOptions({
    onExpire: function(key,value){

getmsgs().then(function(){
    console.log("messages cache was  refreshed");
    },function(){
        console.log("Error getting data putting expire data item back into the messagescache");
        self.MessagesCache.put(key,value);
});

    }

});
// ===============================================

self.MessagedispCache.setOptions({
    onExpire: function(key,value){

getmsgdis().then(function(){
    console.log("messagedisp cache was  refreshed");
    },function(){
        console.log("Error getting data putting expire data item back into the dispcache");
        self.MessagedispCache.put(key,value);
});

    }

});
// ================================================================

self.MessagedispCache.setOptions({
    onExpire: function(key,value){

getlectures().then(function(){
    console.log("LecturesCache  was  refreshed");
    },function(){
        console.log("Error getting data putting expire data item back into the LecturesCache");
        self.MessagedispCache.put(key,value);
});

    }

});

// ===============================================================

var vm = this;

/*function getmsgs(){
 var deferred=$q.defer();
    var cacheKey="messages";
    var messagesdata=self.MessagesCache.get(cacheKey);

    if(messagesdata){


console.log("found data inside the cache",messagesdata);

deferred.resolve(messagesdata);

    }
   
    else{
$http.get("http://localhost:59454/api/Messages/Getall").success(function(data){

    self.MessagesCache.put(cacheKey,data);
      
         deferred.resolve(data);
        
    
    console.log("received msgsdata via http",data,status);

    

})
.error(function(){
    
console.log("error http mhd");
deferred.reject();
});
}
return deferred.promise;


}
*/



function getmsgs(forceRefresh){
      if(typeof forceRefresh==="undefined"){forceRefresh= false;}
    var cacheKey="messages";
var messagesdata=null;
    var deferred=$q.defer();
if(!forceRefresh){
    var messagesdata=self.MessagesCache.get(cacheKey);

};
 
    
    

    if(messagesdata){


console.log("found data inside the cache",messagesdata);

deferred.resolve(messagesdata);

    }
   
    else{
         $ionicLoading.show({
                    template: 'Loading...'
                });
$http.get("http://localhost:59454/api/Messages/Getall").success(function(data){

    self.MessagesCache.put(cacheKey,data);
      $ionicLoading.hide();
         deferred.resolve(data);
        
    
    console.log("received msgsdata via http",data,status);

    

})
.error(function(){
      $ionicLoading.hide();
console.log("error http mhd");
deferred.reject();
});
}
return deferred.promise;


}

function getmsgdis(){
    vm.num=$stateParams.id;
var deferred=$q.defer();

    var cacheKey="msgdis"+vm.num;
    
    console.log(cacheKey);

    var messagedispdata=self.MessagedispCache.get(cacheKey);
    if(messagedispdata){
     deferred.resolve(messagedispdata);
     console.log("received msgdispdata from the cache");




    }

else{

$http.get("http://localhost:59454/api/Messages/Getnew/"+vm.num).success(function(data){

    self.MessagedispCache.put(cacheKey,data);
         deferred.resolve(data);
        
    console.log("received msgdis data via HTTP");
  

})
.error(function(){
console.log("error http mhd");
deferred.reject();
});
}
return deferred.promise;

}

// ----------------------------------------lecturectrl


function getlectures(forceRefresh){
    if(typeof forceRefresh==="undefined"){forceRefresh= false;}
    var cacheKey="lecture";
var lecturedata=null;
    var deferred=$q.defer();
if(!forceRefresh){
    var lecturedata=self.LecturesCache.get(cacheKey);

};

    if(lecturedata){
console.log("lecture found in the Cache");
deferred.resolve(lecturedata);

    }
    else{

         $ionicLoading.show({
                    template: 'Loading...'
                });
$http.get("http://localhost:59454/api/Lectures/Getall").success(function(data){

console.log("lecture received via HTTP");
self.LecturesCache.put(cacheKey,data);
         $ionicLoading.hide();
        
         deferred.resolve(data);
        
   

})
.error(function(){
     $ionicLoading.hide();
   
console.log("error http valuesctrl");
deferred.reject();
});
}

return deferred.promise;

}



function getlecture(){
    var deferred=$q.defer();
vm.num=$stateParams.id;
$http.get("http://localhost:59454/api/Lectures/Getlec/"+vm.num).success(function(data){
deferred.resolve(data);
    console.log("received one lecture ",data,status);

    

})
.error(function(){
    console.log("error get one lecture");
deferred.reject();
});
return deferred.promise;
}





return{
getmsgs: getmsgs,
getmsgdis: getmsgdis,
getlectures: getlectures,
getlecture: getlecture

};





    };


})();