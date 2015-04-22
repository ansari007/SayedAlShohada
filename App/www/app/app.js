angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory", 'ngCordova'])
    .run(function ($ionicPlatform, DSCacheFactory, $cordovaPush, $rootScope, $http) {
        //$ionicPlatform.ready(function () {
        //// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        //// for form inputs)
        //if (window.cordova && window.cordova.plugins.Keyboard) {
        //    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        //}
        //if (window.StatusBar) {
        //    // org.apache.cordova.statusbar required
        //    StatusBar.styleDefault();
        //}



        document.addEventListener("deviceready", onDeviceReady, false);
        // device APIs are available

        function onDeviceReady() {
            pushNotification = window.plugins.pushNotification;
            if (device.platform == 'android' || device.platform == 'Android') {
                //$("#app-status-ul").append("<li>registering android</li>");
                pushNotification.register(successHandler, errorHandler, {
                    "senderID": 864860074818,
                    "ecb": onGcmNotification
                }); // required!
            } else {
                $("#app-status-ul").append("<li>registering iOS</li>");
                pushNotification.register(tokenHandler, errorHandler, {
                    "badge": "true",
                    "sound": "true",
                    "alert": "true",
                    "ecb": "window.onNotificationAPN"
                }); // required!
            }


            // handle APNS notifications for iOS

            window.onNotificationAPN = function (e) {
                if (e.alert) {
                    navigator.notification.alert(e.alert);
                }
                if (e.sound) {
                    var snd = new Media(e.sound);
                    snd.play();
                }
                if (e.badge) {
                    pushNotification.setApplicationIconBadgeNumber(successHandler, e.badge);
                }
            }
            // handle GCM notifications for Android

            //window.onNotificationGCM = function (e) {
            function onGcmNotification(e) {
                navigator.notification.alert(e.event);
                switch (e.event) {
                    case 'registered':
                        if (e.regid.length > 0) {
                            navigator.notification.alert(e.regid);
                            // Your GCM push server needs to know the regID before it can push to this    device
                            // here is where you might want to send it the regID for later use.
                            $("#app-status-ul").append("<li>regID = " + e.regid + "</li>");
                            sessionStorage.setItem("deviceId", e.regid);
                        }
                        break;
                    case 'message':
                        // if this flag is set, this notification happened while we were in the foreground.
                        // you might want to play a sound to get the user's attention, throw up a dialog, etc.
                        if (e.foreground) {
                            navigator.notification.alert('--INLINE NOTIFICATION--');
                            // if the notification contains a soundname, play it.
                            var my_media = new Media("/android_asset/www/" + e.soundname);
                            my_media.play();
                        } else { // otherwise we were launched because the user touched a notification in the notification tray.
                            if (e.coldstart) navigator.notification.alert('--COLDSTART NOTIFICATION--');
                            else navigator.notification.alert('--BACKGROUND NOTIFICATION--');
                        }
                        navigator.notification.alert(e.payload.message);
                        navigator.notification.alert('MESSAGE -> MSGCNT: ' + e.payload.msgcnt);
                        break;
                    case 'error':
                        navigator.notification.alert('ERROR -> MSG:' + e.msg);
                        break;
                    default:
                        navigator.notification.alert('EVENT -> Unknown, an event was received and we do not know what it is');
                        break;
                }
            }

            function tokenHandler(result) {
                navigator.notification.alert(result, null, 'Alert', 'OK');
                sessionStorage.setItem("deviceId", result);
                sessionStorage.setItem("notificationServer", "APNS");
                // Your iOS push server needs to know the token before it can push to this device
                // here is where you might want to send it the token for later use.
            }

            function successHandler(result) {
                navigator.notification.alert(result, null, 'Alert', 'OK');
                sessionStorage.setItem("deviceId", result);
                sessionStorage.setItem("notificationServer", "GCM");
            }

            function errorHandler(error) {
                navigator.notification.alert(error, null, 'Alert', 'OK');
            }
        }
        document.addEventListener('deviceready', onDeviceReady, true);

        //document.addEventListener("deviceready", function () {
        //    var pushNotification = window.plugins.pushNotification;
        //    console.log(pushNotification);
        //    pushNotification.register(
        //           successHandler,
        //           errorHandler,
        //           {
        //               senderID: 864860074818,
        //               ecb: window.onNotificationGcm
        //               //ecb:"app.onNotificationGCM"
        //               //ecb:"app.push_android"
        //           });
        //    function successHandler(result) {
        //        alert("ccccc");
        //        alert('result = ' + result);
        //    }
        //    // result contains any error description text returned from the plugin call
        //    function errorHandler(error) {
        //        alert("yyyy");
        //        alert('error = ' + error);
        //    }

        //    window.onNotificationGcm = function (e) {
        //        switch (e.event) {
        //            case 'registered':
        //                if (e.regid.length > 0) {
        //                    console.log("Regid " + e.regid);
        //                    alert('registration id = ' + e.regid);
        //                }
        //                break;

        //            case 'message':
        //                // this is the actual push notification. its format depends on the data model from the push server
        //                alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
        //                break;

        //            case 'error':
        //                alert('GCM error = ' + e.msg);
        //                break;

        //            default:
        //                alert('An unknown GCM event has occurred');
        //                break;

        //        }
        //    }
        //});


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