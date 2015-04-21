angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory",'ngCordova'])


.run(function ($ionicPlatform, DSCacheFactory, $cordovaPush, $rootScope,$http) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    
        // Push Notification

        // Define the PushPlugin.
        var pushNotification = window.plugins.pushNotification;

        // Platform-specific registrations.
        if (device.platform == 'android' || device.platform == 'Android') {
            // Register with GCM for Android apps.
            pushNotification.register(
               app.successHandler, app.errorHandler,
               {
                   "senderID": 774696930133,
                   "ecb": "app.onNotificationGCM"
               });
            alert()
        } else if (device.platform === 'iOS') {
            // Register with APNS for iOS apps.
            pushNotification.register(
                app.tokenHandler,
                app.errorHandler, {
                    "ecb": "app.onNotificationAPN"
                });
        }
        else if (device.platform === "Win32NT") {
            // Register with MPNS for WP8 apps.
            pushNotification.register(
                app.channelHandler,
                app.errorHandler,
                {
                    "channelName": "MyPushChannel",
                    "ecb": "app.onNotificationWP8",
                    "uccb": "app.channelHandler",
                    "errcb": "app.ErrorHandler"
                });
        }












        var androidConfig = {
            "senderID": "774696930133"
            //"ecb": "onNotification"
        };
        //document.addEventListener("deviceready", function () {
        //    var pushNotification = window.plugins.pushNotification;
        //    console.log(pushNotification);
        //    pushNotification.register(
        //           successHandler,
        //           errorHandler,
        //           {
        //               senderID: "774696930133",
        //               ecb: "onNotificationGCM"
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


        //    function onNotificationGCM(e) {
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



     
    //document.addEventListener("deviceready", function () {
  
    //    $cordovaPush.register(androidConfig).then(function (result) {
    //        alert(result);
    //        alert("registration ok"); // Success
    //    }, function (err) {
              
    //        alert("err: " + err);
    //        alert("registration not ok"); // Error
    //    });

    //    $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
    //        alert("onnotification");
    //        switch (notification.event) {
    //            case 'registered':
    //                if (notification.regid.length > 0) {
    //                    alert('registration ID = ' + notification.regid);
    //                }
    //                break;

    //            case 'message':
    //                // this is the actual push notification. its format depends on the data model from the push server
    //                alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
    //                break;

    //            case 'error':
    //                alert('GCM error = ' + notification.msg);
    //                break;

    //            default:
    //                alert('An unknown GCM event has occurred');
    //                break;
    //        }
    //    });


    //    //WARNING: dangerous to unregister (results in loss of tokenID)
    //    //$cordovaPush.unregister(options).then(function(result) {
    //    //    alert("r"); // Success!
    //    //}, function(err) {
    //    //    // Error
    //    //});

    //}, false);


    });
})


.config(function($stateProvider, $urlRouterProvider) {

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
  })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/home/mainpage');

});