angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory",'ngCordova'])


.run(function ($ionicPlatform, DSCacheFactory, $cordovaPush, $rootScope) {
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
    
      //Push Notification
    var androidConfig = {
        "senderID": "774696930133",
        /*"ecb": "onNotification"*/
    };
      alert("hello1");
     /* document.addEventListener("deviceready", function () {*/
          alert("hello2");
          $cordovaPush.register(androidConfig).then(function (result) {
              alert(result);
            alert("registration ok"); // Success
        }, function(err) {
            alert("registration not ok"); // Error
        });

        $rootScope.$on('$cordovaPush:notificationReceived', function (event, notification) {
            switch (notification.event) {
                case 'registered':
                    if (notification.regid.length > 0) {
                        alert('registration ID = ' + notification.regid);
                    }
                    break;

                case 'message':
                    // this is the actual push notification. its format depends on the data model from the push server
                    alert('message = ' + notification.message + ' msgCount = ' + notification.msgcnt);
                    break;

                case 'error':
                    alert('GCM error = ' + notification.msg);
                    break;

                default:
                    alert('An unknown GCM event has occurred');
                    break;
            }
        });


        // WARNING: dangerous to unregister (results in loss of tokenID)
        $cordovaPush.unregister(options).then(function(result) {
            alert("r"); // Success!
        }, function(err) {
            // Error
        });

    /*}, false);*/

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


    // .state('home.myteams', {
    //   url: "/myteams",
    //   views: {
    //     "tab-myteams": {
    //       templateUrl: "app/home/myteams.html"
    //     }
    //   }
    // })

    // .state('app', {
    //   abstract: true,
    //   url: "/app",
    //   templateUrl: "app/layout/menu-layout.html"
    // })

    // .state('app.teams', {
    //   url: "/teams",
    //   views: {
    //     'mainContent': {
    //       templateUrl: "app/teams/teams.html"
    //     }
    //   }
    // })

    // .state('app.team-detail', {
    //   url: "/teams/:id",
    //   views: {
    //     'mainContent': {
    //       templateUrl: "app/teams/team-detail.html"
    //     }
    //   }
    // })

    // .state('app.game', {
    //   url: "/game/:id",
    //   views: {
    //     'mainContent': {
    //       templateUrl: "app/game/game.html"
    //     }
    //   }
    // })

    // .state('app.standings', {
    //   url: "/standings",
    //   views: {
    //     'mainContent': {
    //       templateUrl: "app/standings/standings.html"
    //     }
    //   }
    // })

    // .state('app.locations', {
    //   url: "/locations",
    //   views: {
    //     'mainContent': {
    //       templateUrl: "app/locations/locations.html"
    //     }
    //   }
    // })

    // .state('app.rules', {
    //   url: "/rules",
    //   views: {
    //     'mainContent': {
    //       templateUrl: "app/rules/rules.html",
    //     }
    //   }
    // });

    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home/mainpage');
});