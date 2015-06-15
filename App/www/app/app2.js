angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory", 'ngCordova',
  'ionic.service.core',
  'ionic.service.push'
])

.run(function ($ionicPlatform, DSCacheFactory, $cordovaPush, $cordovaDialogs, $rootScope, $http, $cordovaDevice, apictrl, $ionicPush) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        //if (window.cordova && window.cordova.plugins.Keyboard) {
        //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //}
        //if (window.StatusBar) {
        //    // org.apache.cordova.statusbar required
        //    StatusBar.styleDefault();
        //}

        // Push Notification
        document.addEventListener("deviceready", function () {

            var pushNotification = window.plugins.pushNotification;
            console.log(pushNotification);
            if (ionic.Platform.isAndroid()) {
                pushNotification.register(
                    successHandler,
                    errorHandler,
                    {
                        senderID: "774696930133",
                        ecb: "window.onNotificationGCM"
                    });
               /* $ionicPush.register({
                    canShowAlert: true, //Can pushes show an alert on your screen?
                    canSetBadge: true, //Can pushes update app icon badges?
                    canPlaySound: true, //Can notifications play a sound?
                    canRunActionsOnWake: true, //Can run actions outside the app,
                    onNotification: function (notification) {
                        // Handle new push notifications here
                        alert("notification goes here!!")
                        alert(notification);
                        return true;
                    }
                });*/
            }

            function successHandler(result) {
                console.log("device registered : " + result);
            }
            // result contains any error description text returned from the plugin call
            function errorHandler(error) {
                console.log('error when registering device : ' + error);
            }
        });
        window.onNotificationGCM = function (e) {
            switch (e.event) {
                case 'registered':

                    if (e.regid.length > 0) {
                        /*alert("Regid " + e.regid);*/
                        //Post
                        var device = {
                            Token: e.regid,
                            Platform: $cordovaDevice.getPlatform(),
                            UdId: $cordovaDevice.getUUID(),
                            OsVersion: $cordovaDevice.getVersion()
                        }
                        apictrl.postdeviceinfo(device);
                    }
                    break;

                case 'message':                  
                    alert("notification goes here!!");

                     if (e.foreground) {
                        alert(e.payload.message, "Push Notification Received");
                         // on Android soundname is outside the payload.
                         // On Amazon FireOS all custom attributes are contained within payload
                         //var soundfile = e.soundname || e.payload.sound;
                         //if the notification contains a soundname, play it.
                         // var my_media = new Media("/android_asset/www/" + soundfile);
                         // my_media.play();
                     }
                     else {  // otherwise we were launched because the user touched a notification in the notification tray.
                         if (e.coldstart) {
 

                            
                         }
                         else {

                            
                         }
                     }
                   
                     break;

                case 'error':
                   // alert("error");
                    break;

                default:
                    //alert("Unknown");
                    break;
            }
        }
    });
})


.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('home', {
            abstract: true,
            url: "/home",
            templateUrl: "www/app/home/home.html"
        })
        .state('home.mainpage', {
            url: "/mainpage",
            templateUrl: "www/app/home/mainpage.html"
        })
        .state('home.lecture', {
            url: "/lectures",
            templateUrl: "www/app/home/lecture.html"
        })
        .state('home.news', {
            url: "/news",
            templateUrl: "www/app/home/news.html"
        })
         .state('home.article', {
             url: "/article",
             templateUrl: "www/app/home/article.html"
         })
        .state('home.articlesdisplay', {
            url: "/article/:id",
            templateUrl: "www/app/home/articlesdisplay.html"
        })
        .state('home.newsdisplay', {
            url: "/news/:id",
            templateUrl: "www/app/home/newsdisplay.html"
        })
        .state('home.viewlecture', {
            url: "/lecture/:id",
            templateUrl: "www/app/home/viewlecture.html"
        });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home/mainpage');

});