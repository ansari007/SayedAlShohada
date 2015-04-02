angular.module("eliteApp", ["ionic", "angular-data.DSCacheFactory"])


.run(function($ionicPlatform, DSCacheFactory) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    //if(window.cordova && window.cordova.plugins.Keyboard) {
    //  cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //}
    //if(window.StatusBar) {
    //  // org.apache.cordova.statusbar required
    //  StatusBar.styleDefault();
    //}
      DSCacheFactory("MessagesCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
      DSCacheFactory("MessagedispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
      DSCacheFactory("LecturesCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });
      DSCacheFactory("LecturedispCache", { storageMode: "localStorage", maxAge: 5000000, deleteOnExpire: "aggressive" });

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