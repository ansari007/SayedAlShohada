(function () {
    'use strict';
    angular.module('eliteApp').factory('apictrl', ['$ionicLoading', '$stateParams', '$http', '$q', 'DSCacheFactory', '$ionicUser', '$ionicPush', apictrl]);
    function apictrl($ionicLoading, $stateParams, $http, $q, DSCacheFactory, $ionicUser, $ionicPush) {
        DSCacheFactory("MessagesCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
        DSCacheFactory("MessagedispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
        DSCacheFactory("LecturesCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
        DSCacheFactory("LecturedispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
        DSCacheFactory("MainPageNewsdispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
        DSCacheFactory("MainPageArticledispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
        DSCacheFactory("MainPageLecturedispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });

        self.MessagesCache = DSCacheFactory.get("MessagesCache");
        self.MessagedispCache = DSCacheFactory.get("MessagedispCache");
        self.LecturesCache = DSCacheFactory.get("LecturesCache");
        self.LecturedispCache = DSCacheFactory.get("LecturedispCache");
        self.staticCache = DSCacheFactory.get("staticCache");
        self.MainPageNewsdispCache = DSCacheFactory.get("MainPageNewsdispCache");
        self.MainPageArticledispCache = DSCacheFactory.get("MainPageArticledispCache");
        self.MainPageLecturedispCache = DSCacheFactory.get("MainPageLecturedispCache");
        // ===============================================
        self.MessagesCache.setOptions({
            onExpire: function (key, value) {

                getmsgs().then(function () {
                    console.log("messages cache was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the messagescache");
                    self.MessagesCache.put(key, value);
                });
            }
        });
        //    ===============================================

        self.MessagedispCache.setOptions({
            onExpire: function (key, value) {

                getmsgdis().then(function () {
                    console.log("messagedisp cache was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the dispcache");
                    self.MessagedispCache.put(key, value);
                });
            }
        });
        //  ================================================================

        self.LecturesCache.setOptions({
            onExpire: function (key, value) {

                getlectures().then(function () {
                    console.log("LecturesCache  was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the LecturesCache");
                    self.LecturesCache.put(key, value);
                });
            }
        });

        // ===============================================================
        self.LecturedispCache.setOptions({
            onExpire: function (key, value) {
                getlecture().then(function () {
                    console.log("LecturedispCache  was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the LecturedispCache");
                    self.LecturedispCache.put(key, value);
                });
            }
        });

        // ===============================================================
        self.MainPageNewsdispCache.setOptions({
            onExpire: function (key, value) {
                getmainpagenews().then(function () {
                    console.log("MainPageNewsdispCache  was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the MainPageNewsdispCache");
                    self.MainPageNewsdispCache.put(key, value);
                });
            }
        });
        //==================================================================

        self.MainPageArticledispCache.setOptions({
            onExpire: function (key, value) {
                getmainpagearticle().then(function () {
                    console.log("MainPageArticledispCache  was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the MainPageArticledispCache");
                    self.MainPageArticledispCache.put(key, value);
                });
            }
        });
        //==================================================================

        self.MainPageLecturedispCache.setOptions({
            onExpire: function (key, value) {
                getmainpagelecture().then(function () {
                    console.log("MainPageLecturedispCache  was  refreshed");
                }, function () {
                    console.log("Error getting data putting expire data item back into the MainPageLecturedispCache");
                    self.MainPageLecturedispCache.put(key, value);
                });
            }
        });
        //==================================================================
        var vm = this;
        var local = "http://Dev-08:59454/api/";
        var online = "http://sayedalshohada.azurewebsites.net/api/";
        var url = local;

        function getmsgs(forceRefresh) {
            if (typeof forceRefresh === "undefined") { forceRefresh = false; }
            var cacheKey = "messages";
            var messagesdata = null;
            var deferred = $q.defer();
            if (!forceRefresh) {
                var messagesdata = self.MessagesCache.get(cacheKey);
            };

            if (messagesdata) {
                console.log("found data inside the cache", messagesdata);
                deferred.resolve(messagesdata);
            }
            else {
                $ionicLoading.show({
                    template: '...Loading'
                });
                $http.get(url + "Messages/Getall").success(function (data) {
                        alert("Message" + data);
                    self.MessagesCache.put(cacheKey, data);
                    $ionicLoading.hide();
                    deferred.resolve(data);
                    console.log("received msgsdata via http", data, status);
                })
                .error(function () {
                    $ionicLoading.hide();
                    console.log("error http mhd");
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        function getmsgdis() {
            vm.num = $stateParams.id;
            var deferred = $q.defer();
            var cacheKey = "msgdis" + vm.num;

            console.log(cacheKey);

            var messagedispdata = self.MessagedispCache.get(cacheKey);
            if (messagedispdata) {
                deferred.resolve(messagedispdata);
                console.log("received msgdispdata from the cache");
            }

            else {
                $http.get(url + "Messages/Getnew/" + vm.num).success(function (data) {

                    self.MessagedispCache.put(cacheKey, data);
                    deferred.resolve(data);
                    console.log("received msgdis data via HTTP");
                })
                .error(function () {
                    console.log("error http mhd");
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        // ----------------------------------------lecturectrl


        function getlectures(forceRefresh) {
            if (typeof forceRefresh === "undefined") { forceRefresh = false; }
            var cacheKey = "lecture";
            var lecturedata = null;
            var deferred = $q.defer();
            if (!forceRefresh) {
                var lecturedata = self.LecturesCache.get(cacheKey);
            };

            if (lecturedata) {
                console.log("lecture found in the Cache");
                deferred.resolve(lecturedata);
            }
            else {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.get(url + "Lectures/Getall").success(function (data) {

                    console.log("lecture received via HTTP");
                    self.LecturesCache.put(cacheKey, data);
                    $ionicLoading.hide();
                    deferred.resolve(data);
                })
                .error(function () {
                    $ionicLoading.hide();
                    console.log("error http valuesctrl");
                    deferred.reject();
                });
            }
            return deferred.promise;
        }

        function getlecture() {
            var deferred = $q.defer();
            vm.num = $stateParams.id;
            $http.get(url + "Lectures/Getlec/" + vm.num).success(function (data) {
                deferred.resolve(data);
                console.log("received one lecture via http ", data, status);
            })
            .error(function () {
                console.log("error get one lecture");
                deferred.reject();
            });
            return deferred.promise;
        }

        function getmainpagenews(forceRefresh) {
            
            var cacheKey = "mainpagenews";
            var mainpagenewsdata = null;
            var deferred = $q.defer();
            if (!forceRefresh) {
                var mainpagenewsdata = self.MainPageNewsdispCache.get(cacheKey);
            };

            if (mainpagenewsdata) {
                console.log("lecture found in the Cache");
                deferred.resolve(mainpagenewsdata);
            }
            else {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.get(url + "MainPage/Getnews").success(function (data) {
                    self.MainPageNewsdispCache.put(cacheKey, data);
                    $ionicLoading.hide();
                    deferred.resolve(data);
                    console.log("received news via http ", data, status);
                })
                .error(function () {
                    $ionicLoading.hide();
                    console.log("error get one lecture");
                    deferred.reject();
                });
        }

        return deferred.promise;
        }

    
        function getmainpagearticle(forceRefresh) {
            var cacheKey = "mainpagearticle";
            var mainpagearticledata = null;
            var deferred = $q.defer();

            if (!forceRefresh) {
                var mainpagearticledata = self.MainPageArticledispCache.get(cacheKey);
            };

            if (mainpagearticledata) {
                console.log("lecture found in the Cache");
                deferred.resolve(mainpagearticledata);
            } else {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.get(url + "MainPage/Getarticle").success(function (data) {
                    self.MainPageArticledispCache.put(cacheKey, data);
                    $ionicLoading.hide();
                        deferred.resolve(data);
                        console.log("received article via http ", data, status);
                    })
                    .error(function () {
                        $ionicLoading.hide();
                        console.log("error get one article");
                        deferred.reject();
                    });
            }
            return deferred.promise;
        }


        function getmainpagelecture(forceRefresh) {
            var cacheKey = "mainpagelecture";
            var mainpagelecturedata = null;
            var deferred = $q.defer();
            if (!forceRefresh) {
                var mainpagelecturedata = self.MainPageLecturedispCache.get(cacheKey);
            };

            if (mainpagelecturedata) {
                console.log("lecture found in the Cache");
                deferred.resolve(mainpagelecturedata);
            } else {
                $ionicLoading.show({
                    template: 'Loading...'
                });
                $http.get(url + "MainPage/Getlecture").success(function (data) {
                    self.MainPageLecturedispCache.put(cacheKey, data);
                    $ionicLoading.hide();
                        deferred.resolve(data);
                        console.log("received lecture via http ", data, status);
                    })
                    .error(function () {
                        $ionicLoading.hide();
                        console.log("error get one lecture");
                        deferred.reject();
                    });

            }
            return deferred.promise;
        }

        //----------------<push notification>-------------------------------------------------------------------
        function postdeviceinfo(device) {
            //alert(device);
            $http.post(url + "Push/InsertDevice", device).
           success(function (data, status, headers, config) {
               console.log(" device info post ok");
           }).

          error(function (data, status, headers, config) {
              console.log("error post device info");
          });
        }

        function identifyUser () {
            console.log('Ionic User: Identifying with Ionic User service');

            var user = $ionicUser.get();
            if (true) {
                // Set your user_id here, or generate a random one.
                user.user_id = $ionicUser.generateGUID();
                angular.extend(user, {
                    name: 'Ionitron',
                    bio: 'I come from planet Ion'
                });

                // Identify your user with the Ionic User Service
                $ionicUser.identify(user).then(function () {
                    $scope.identified = true;
                    alert('Identified user ' + user.name + '\n ID ' + user.user_id);
                });

            };
        };

       function pushRegister () {
            alert('Ionic Push: Registering user');

            // Register with the Ionic Push service.  All parameters are optional.
            $ionicPush.register({
                canShowAlert: true, //Can pushes show an alert on your screen?
                canSetBadge: true, //Can pushes update app icon badges?
                canPlaySound: true, //Can notifications play a sound?
                canRunActionsOnWake: true, //Can run actions outside the app,
                onNotification: function (notification) {
                    // Handle new push notifications here
                    // console.log(notification);
                    return true;
                }
            });

        };
       return {
           //pushRegister: pushRegister,
            identifyUser: identifyUser,
            getmsgs: getmsgs,
            getmsgdis: getmsgdis,
            getlectures: getlectures,
            getlecture: getlecture,
            postdeviceinfo: postdeviceinfo,
            getmainpagelecture: getmainpagelecture,
            getmainpagearticle: getmainpagearticle,
            getmainpagenews: getmainpagenews

        };
    };
})();