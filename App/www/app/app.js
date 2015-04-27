angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory", 'ngCordova'])


.run(function ($ionicPlatform, DSCacheFactory, $cordovaPush, $rootScope, $http, $cordovaDevice,apictrl) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }

        // Push Notification
        document.addEventListener("deviceready", function () {


            var pushNotification = window.plugins.pushNotification;
            console.log(pushNotification);
            pushNotification.register(
                   successHandler,
                   errorHandler,
                   {
                       senderID: "774696930133",
                       ecb: "window.onNotificationGCM"
                       //ecb:"app.onNotificationGCM"
                       //ecb:"app.push_android"
                   });
            function successHandler(result) {

                alert("ccccc");
                alert('result = ' + result);
            }
            // result contains any error description text returned from the plugin call
            function errorHandler(error) {
                alert("yyyy");
                alert('error = ' + error);
            }
        });
        window.onNotificationGCM = function (e) {
            switch (e.event) {
                case 'registered':
                    if (e.regid.length > 0) {

                        console.log("Regid " + e.regid);
                        alert('registration id = ' + e.regid);
                        //Post
                        var device = {
                            Token: e.regid,
                            Platform: $cordovaDevice.getPlatform(),
                            UdId: $cordovaDevice.getUUID(),
                            OsVersion: $cordovaDevice.getVersion()
                        }
                        // apictrl.postdeviceinfo(device);
      /*                  $http.post("http://Dev-010:59454/api/Push/Insertinfo", device).
         success(function (data, status, headers, config) {
             alert(" device info post ok");
         }).

        error(function (data, status, headers, config) {
            alert("error post device info");
        });*/

                        $http.get('http://Dev-010:59454/api/Push/Getdevice').then(function (result) {
                            alert(result);
                        });
                        alert("dwedwd");
                    }
                    break;

                case 'message':
                    // this is the actual push notification. its format depends on the data model from the push server
                    alert('message = ' + e.message + ' msgcnt = ' + e.msgcnt);
                    break;

                case 'error':
                    alert('GCM error = ' + e.msg);
                    break;

                default:
                    alert('An unknown GCM event has occurred');
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