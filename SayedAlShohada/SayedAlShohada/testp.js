var mhdapp = angular.module("mhdapp", ['ngRoute', 'ngAnimate', 'toaster', "ngSanitize",'ngCookies',
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster"]);

mhdapp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: "/SayedAlShohada/main.html",
            controller: "mainpagectrl"
        })
        .when("/viewinbox", {
            templateUrl: "/SayedAlShohada/viewinbox.html",
            controller: "inbox"
        })
        .when("/viewmessage/:num", {
            templateUrl: "/SayedAlShohada/viewmessage.html",
            controller: "messages"
        })
        .when("/viewarticles", {
            templateUrl: "/SayedAlShohada/viewarticles.html",
            controller: "articles"
        })
        .when("/viewarticle/:num", {
            templateUrl: "/SayedAlShohada/viewarticle.html",
            controller: "article"
        })
          .when("/login", {
              templateUrl: "/SayedAlShohada/SignIn.html",
              controller: "c1"
          })

        .when("/main", {
            templateUrl: "/SayedAlShohada/main.html",
            controller: "mainpagectrl"
        })

        .when("/view3", {
            templateUrl: "/SayedAlShohada/view3.html",
            controller: "c3"
        })

        .when("/lecturectrl", {
            templateUrl: "/SayedAlShohada/lecturectrl.html",
            controller: "c3"
        })

        .when("/createlecture", {
            templateUrl: "/SayedAlShohada/createlecture.html",
            controller: "c3"
        })

        .when("/editnews/:num", {
            templateUrl: "/SayedAlShohada/editnews.html",
            controller: "editCtrl"
        })

         .when("/editarticle/:num", {
             templateUrl: "/SayedAlShohada/editarticle.html",
             controller: "editarticle"
         })

         .when("/editlecture/:num", {
             templateUrl: "/SayedAlShohada/editlecture.html",
             controller: "editlecCtrl"
         })

            .when("/view4/:num", {
                templateUrl: "/SayedAlShohada/view4.html",
                controller: "viewlecture"
            })
    .otherwise({
        redirectTo: "/SayedAlShohada/containerpage.html"
    });
}
]);

mhdapp.controller("c1", function ($scope) {

    console.log("gtrgtrg");
}
);


mhdapp.controller("c3", ["$scope", "$routeParams", "$http", "$location", '$route', '$window','toaster', c3]);
function c3($scope, $routeParams, $http, $location, $route, $window, toaster) {
    $scope.dat = 0;
    $scope.currentPage = 1;
    $scope.enablepagi = false;
    sessionStorage.pagelecsession = $scope.currentPage;
    sessionStorage.pageconlecsession = $scope.currentPage;
    if (sessionStorage.lecsession != null) {
        if (sessionStorage.lecsession != "") {
            $scope.currentPage = sessionStorage.lecsession;
            sessionStorage.lecsession = "";
        }
    }

    if (sessionStorage.conlecsession != null) {
        if (sessionStorage.conlecsession != "") {
            $scope.currentPage = sessionStorage.conlecsession;
            sessionStorage.conlecsession = "";
        }
    }

    $scope.user = { title: '', description: '', status: '' };
    $scope.back = function () {
        $window.history.back();
    }
    //$http.get('/api/Lectures/Getall').then(function (result) {

    //    $scope.dat = result.data;


    //    console.log($scope.dat);
    //});
    $http.get('/api/Lectures/GetNext/' + $scope.currentPage).then(function (result) {
        if (result.data.news.length != 0) {
            $scope.enablepagi = true;
        }
        else {
            $scope.enablepagi = false;
        }
        $scope.dat = result.data.news;
        $scope.totalpage = result.data.total;
        console.log($scope.dat);
        console.log($scope.dat[0]);
    });

    if ($scope.currentPage == 1) {
        $scope.boolprevious = false;
    } else {
        $scope.boolprevious = true;

    }

    $scope.submit1 = function () {
        $http.post('/api/Lectures/Postlec', $scope.user).
          success(function (data, status, headers, config) {
              //$scope.lecForm.$setPristine();
              $scope.user = { title: '', description: '' };
              //$scope.reloadRoute = function () {
              //    $route.reload();
              //}
              //$route.reload();
              console.log("post ok");
              $location.path("/lecturectrl");
          }).
  error(function (data, status, headers, config) {
      console.log("post not ok");
  });
    }

    $scope.deletelecture = function (val) {

        $http.delete('/api/Lectures/Deletelec/' + val).
          success(function (data, status, headers, config) {
              $http.get('/api/Lectures/GetNext/' + $scope.currentPage).then(function (result) {
                  $scope.totalpage = result.data.total;
                  $scope.dat = result.data.news;
                  if (result.data.news.length != 0) {
                      
                      $scope.enablepagi = true;
                  }
                  else {
                      if ($scope.currentPage != 1) {
                          $scope.currentPage--;
                          $scope.enablepagi = true;
                          $http.get('/api/Lectures/GetNext/' + $scope.currentPage).then(function (resultt) {

                              $scope.totalpage = result.data.total;
                              $scope.dat = resultt.data.news;
                          });
                      }
                      else { $scope.enablepagi = false; }
                      
                  }
                  
                  $scope.popsuccess = function () {
                      toaster.pop('note', "تمة الحذف بنجاح", "");
                  };
                  $scope.popsuccess();
                  console.log($scope.dat);
                  console.log("second httpget lectures");
              });
              console.log("deletepost ok lecture");
          }).
  error(function (data, status, headers, config) {
      $scope.popfailed = function () {
          toaster.pop('error', "لم يتم الحذف بنجاح  ", "");
      };
      console.log("deletepost not ok lecture");
  });
    }

    $scope.changestatus = function (id, val2) {
        if (val2 == 10 || val2 == 30) {

            $http.put('/api/Lectures/Publish/' + id).
                success(function (data, status, headers, config) {
                    $http.get('/api/Lectures/GetNext/' + $scope.currentPage).then(function (result) {
                        $scope.dat = result.data.news;
                        console.log($scope.dat);
                        console.log("second httpget lectures");
                    });
                    console.log("statusupdate ok lecture");
                }).
                error(function (data, status, headers, config) {
                    console.log("deletepost not ok lecture");
                });
        }
        if (val2 == 20) {

            $http.put('/api/Lectures/Withdraw/' + id).
                success(function (data, status, headers, config) {
                    $http.get('/api/Lectures/GetNext/' + $scope.currentPage).then(function (result) {
                        $scope.dat = result.data.news;
                        console.log($scope.dat);
                        console.log("second httpget lectures");
                    });
                    console.log("statusupdate ok lecture");
                }).
                error(function (data, status, headers, config) {
                    console.log("deletepost not ok lecture");
                });
        }
    }

    $scope.paginext = function () {
        if ($scope.currentPage < $scope.totalpage) {
            $scope.currentPage++;
            sessionStorage.pagelecsession = $scope.currentPage;
            sessionStorage.pageconlecsession = $scope.currentPage;
           

            $http.get('/api/Lectures/Getnext/' + $scope.currentPage).then(function (result) {


                $scope.dat = result.data.news;
                $scope.totalpage = result.data.total;
                console.log($scope.dat);
            });
        }
    }

    $scope.pagiprevious = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            sessionStorage.pagelecsession = $scope.currentPage;
            sessionStorage.pageconlecsession = $scope.currentPage;
            $http.get('/api/Lectures/Getnext/' + $scope.currentPage).then(function (result) {
                $scope.dat = result.data.news;
                console.log($scope.dat);
            });
        }
    }
};


mhdapp.controller("inbox", function ($scope, $routeParams, $http, $route, toaster) {
    $scope.dat = 0;
    $scope.enablepagi = false;
    $scope.classnext = 'bancolor';
    $scope.classprevious = 'unavailable';
    $scope.currentPage = 1;
    sessionStorage.pagesession = $scope.currentPage;
    if (sessionStorage.messagesession != null) {
        if (sessionStorage.messagesession != "") {
            $scope.currentPage = sessionStorage.messagesession;
            sessionStorage.messagesession = "";
        }
    }
    $scope.user = { title: '', description: '' };
    $http.get('/api/Messages/GetNext/' + $scope.currentPage).then(function (result) {
        if (result.data.news.length != 0) {
            $scope.enablepagi = true;
        }
        else {
            $scope.enablepagi = false;
        }
        $scope.dat = result.data.news;
        $scope.totalpage = result.data.total;
        console.log($scope.dat);
        console.log($scope.dat[0]);
    });

    if ($scope.currentPage == 1) {
        $scope.boolprevious = false;

    } else {
        $scope.boolprevious = true;
    }

    $scope.paginext = function () {
        if ($scope.currentPage < $scope.totalpage) {
            $scope.currentPage++;
            sessionStorage.pagesession = $scope.currentPage;
            $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {

                $scope.dat = result.data.news;
                $scope.totalpage = result.data.total;
                console.log($scope.dat);
                console.log("totalpage",$scope.totalpage);
            });
        }
    }

    $scope.pagiprevious = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            sessionStorage.pagesession = $scope.currentPage;
            $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {
                $scope.dat = result.data.news;
                $scope.totalpage = result.data.total;
                console.log($scope.dat);
            });
        }
    }

    $scope.edition = function (val) {
        $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {
            $scope.dat = result.data.news;
            console.log($scope.dat);
            $scope.user = { title: '', description: '' };
            console.log("edit");
        });
    }
    $scope.submit = function () {
        $http.post('/api/Messages/Forminfo', $scope.user)
            .success(function (data, status, headers, config) {
                $scope.myForm.$setPristine();
                $scope.user = { title: '', description: '' };
                console.log("post ok");
                $scope.currentPage = 1;
                $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {
                    $scope.totalpage = result.data.total;
                    if (result.data.news.length != 0) {
                        $scope.enablepagi = true;
                    }
                    else {
                        $scope.enablepagi = false;
                    }
                    $scope.dat = result.data.news;

                    $scope.popsuccess = function () {
                        toaster.pop('note', "تمة الإضافة بنجاح", "");
                    };
                    $scope.popsuccess();
                    console.log($scope.dat);
                    console.log("currentpage",$scope.currentPage);
                });
            })
            .error(function (data, status, headers, config) {
                $scope.popfailed = function () {
                    toaster.pop('error', "لم تتم الإضافة ", "");
                };
                console.log("post not ok");

                $scope.popfailed();
            });

    }

    $scope.deletenews = function (val) {

        $http.delete('/api/Messages/Deletenews/' + val)
            .success(function (data, status, headers, config) {
                $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {
                    $scope.totalpage = result.data.total;
                    $scope.dat = result.data.news;
                    if (result.data.news.length != 0) {

                        $scope.enablepagi = true;
                    }
                    else {
                        if ($scope.currentPage != 1) {
                            $scope.currentPage--;
                            $scope.enablepagi = true;
                            $http.get('/api/Messages/GetNext/' + $scope.currentPage).then(function (resultt) {

                                $scope.totalpage = result.data.total;
                                $scope.dat = resultt.data.news;
                            });
                        }
                        else { $scope.enablepagi = false; }

                    }
                    console.log("second httpget");
                    $scope.popsuccess = function () {
                        toaster.pop('note', "تمة الحذف بنجاح", "");
                    };
                    $scope.popsuccess();
                });
                console.log("deletepost ok");
            })
            .error(function (data, status, headers, config) {
                console.log("deletepost not ok");
                $scope.popfailed = function () {
                    toaster.pop('error', "لم يتم الحذف بنجاح  ", "");
                };
                console.log("post not ok");

                $scope.popfailed();
            });
    }
});


mhdapp.controller("messages", function ($scope, $routeParams, $http, $window, toaster) {
    $scope.back = function () {
        $window.history.back();
    }
    console.log("messgaes contoller");
    $scope.idv = $routeParams.num;

    $http.get('/api/Messages/Getnew/' + $scope.idv).then(function (result) {
        sessionStorage.messagesession = sessionStorage.pagesession;
        $scope.data = result.data;
        console.log($scope.data);
        console.log($scope.idv);
        console.log($scope.data[0]);
    });
});



mhdapp.controller("editCtrl", function ($scope, $routeParams, $http, $location, $window, toaster) {
    $scope.back = function () {
        $window.history.back();
        //window.scrollTo(x - 0, y - 0);
    }
    console.log("EDIT contoller");
    $scope.idv = $routeParams.num;
    $http.get('/api/Messages/Getnew/' + $scope.idv).then(function (result) {
        $scope.dat = result.data;
        $scope.user = { title: $scope.dat.Title, description: $scope.dat.Description };
        $scope.showtitle = $scope.dat.Title;
    });

    $scope.editnews = function () {

        $http.put('/api/Messages/Editnew/' + $scope.idv, $scope.user)
            .success(function (data, status, headers, config) {
                console.log("put ok");
                $scope.popsuccess = function () {
                    toaster.pop('note', "تم التعديل بنجاح", "");
                };
                $scope.popsuccess();
                $location.path("/viewinbox");
                //setTimeout(function () {

                //    $location.path("/viewinbox");
                //}, 2000);
            })
            .error(function (data, status, headers, config) {
                console.log("put not ok");
                $scope.popfailed = function () {
                    toaster.pop('error', "لم يتم التعديل بنجاح ", "");
                };
                console.log("post not ok");

                $scope.popfailed();
            });

    }

});

mhdapp.controller("viewlecture", function ($scope, $routeParams, $http, $window, toaster) {

    console.log("viewlecture contoller");
    sessionStorage.lecsession = sessionStorage.pagelecsession;
    $scope.idv = $routeParams.num;
    $scope.back = function () {
        $window.history.back();
    }

    $http.get('/api/Lectures/Getlec/' + $scope.idv).then(function (result) {
        $scope.dat = result.data;
        console.log($scope.dat);
        console.log($scope.idv);
    });
});
/*
mhdapp.controller("vidogularv3", function ($scope, $routeParams, $http, $sce) {
    console.log("videogular Ctrl");

    this.config = {
        sources: [
            { src: $sce.trustAsResourceUrl("video/123.mp4"), type: "video/mp4" }

        ],
        theme: "../Scripts/bower_components/videogular-themes-default/videogular.css",
        plugins: {
            poster: $sce.trustAsResourceUrl("http://www.videogular.com/assets/images/videogular.png")
        }
    };


});*/


mhdapp.controller("vidogularv4", function ($scope, $routeParams, $http, $sce) {
    console.log("videogularv4 Ctrl");
    var local = "http://localhost:1322";
    var online = "http://sayedalshohada.azurewebsites.net";
    var url = local;
    var that = this;

    $http.get('/api/Lectures/Getlec/' + $scope.idv).then(function (result) {
        $scope.v4 = url + result.data.Vlocation;
        console.log($scope.v4 + "v4loc");
        that.config = {
            sources: [
                { src: $sce.trustAsResourceUrl($scope.v4), type: "video/mp4" }
            ],
            theme: "../Scripts/bower_components/videogular-themes-default/videogular.css",
            plugins: {
                poster: $sce.trustAsResourceUrl("http://www.videogular.com/assets/images/videogular.png")
            }

        };
    });
});



mhdapp.controller("editlecCtrl", function ($scope, $routeParams, $http, $location, $window, toaster) {
    sessionStorage.conlecsession = sessionStorage.pageconlecsession;
    $scope.back = function () {
        $window.history.back();
    }
    console.log("EDIT lecture controller");
    $scope.idv = $routeParams.num;

    $http.get('/api/Lectures/Getlec/' + $scope.idv).then(function (result) {
        $scope.data = result.data;
        console.log($scope.data);
        $scope.user = { title: $scope.data.Vtitle, description: $scope.data.Vdescription, status: $scope.data.Vstatus };
        $scope.urlv = $scope.data.Vlocation;
        console.log($scope.urlv);
    });


    $scope.editlectures = function () {

        $http.put('/api/Lectures/Putlec/' + $scope.idv, $scope.user)
            .success(function (data, status, headers, config) {
                console.log("put lec ok");
                $scope.popsuccess = function () {
                    toaster.pop('note', "تم التعديل بنجاح", "");
                };
                $scope.popsuccess();
                $location.path("/lecturectrl");
            })
            .error(function (data, status, headers, config) {
                console.log("put lec not ok");
                $scope.popfailed = function () {
                    toaster.pop('error', "لم يتم التعديل بنجاح ", "");
                };
                console.log("post not ok");

                $scope.popfailed();
            });
    }
});



mhdapp.controller("logctrl", function ($scope, $routeParams, $http, $location, $window, toaster, $cookieStore) {
    $scope.user = { username: '', password: '' };
    if ($cookieStore.get('login') != null) {
        console.log(" cookie was found");
        $cookieStore.put('login', false);
        $scope.notLoggedIn = false;
        $scope.LoggedIn = true;
    } else {

        console.log("login ctrl");
        console.log("cookie was not found");
        /* var favoriteCookie = $cookieStore.get('myFavorite');*/
        
        $scope.notLoggedIn = true;
        $scope.LoggedIn = false;
    }
    $scope.popfailed = function() {
        toaster.pop('error', "الإسم أو كلمة المرور غير مطابقة", "");
    };
    console.log("post not ok");

    $scope.logverif = function() {
        if ($scope.user.username == "" || $scope.user.password == "") {
            $scope.popfailed();
        } else{
            $http.post('/api/Login/Verif', $scope.user).then(function(result) {
                var loggedResult = result.data;
                if (loggedResult == false) {
                    $scope.popfailed();
                } else {
                    $scope.LoggedIn = loggedResult;
                    $scope.notLoggedIn = false;
                    $cookieStore.put('login', true);
                    $location.path("/main");

                }
                console.log($scope.LoggedIn);

            });
    }
}

   
    
    $scope.logout = function () {
        $cookieStore.remove('login');
        $scope.notLoggedIn = true;
        $scope.LoggedIn = false;
    }
});


mhdapp.controller("articles", function ($scope, $routeParams, $http, $route, toaster) {
    $scope.dat = 0;
    $scope.enablepagi = false;
    $scope.classnext = 'bancolor';
    $scope.classprevious = 'unavailable';
    $scope.currentPage = 1;
    sessionStorage.pagesession = $scope.currentPage;
    if (sessionStorage.articlesession != null) {
        if (sessionStorage.articlesession != "") {
            $scope.currentPage = sessionStorage.articlesession;
            sessionStorage.articlesession = "";
        }
    }

    $scope.user = { title: '', description: '' };

    $http.get('/api/Articles/GetNext/' + $scope.currentPage).then(function (result) {
        if (result.data.Articles.length != 0) {
            $scope.enablepagi = true;
        }
        else {
            $scope.enablepagi = false;
        }
        $scope.dat = result.data.Articles;
        $scope.totalpage = result.data.total;
        console.log($scope.dat);
        console.log($scope.dat[0]);
    });

    if ($scope.currentPage == 1) {
        $scope.boolprevious = false;

    }
    else {
        $scope.boolprevious = true;
    }

    $scope.paginext = function () {
        if ($scope.currentPage < $scope.totalpage) {
            $scope.currentPage++;
            sessionStorage.pagesession = $scope.currentPage;

            $http.get('/api/Articles/Getnext/' + $scope.currentPage).then(function (result) {
                $scope.dat = result.data.Articles;
                $scope.totalpage = result.data.total;
                console.log($scope.dat);
            });
        }
    }

    $scope.pagiprevious = function () {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            sessionStorage.pagesession = $scope.currentPage;
            $http.get('/api/Articles/Getnext/' + $scope.currentPage).then(function (result) {
                $scope.dat = result.data.Articles;
                $scope.totalpage = result.data.total;
                console.log($scope.dat);
            });
        }
    }

    $scope.edition = function (val) {
        $http.get('/api/Articles/Getnext/' + $scope.currentPage).then(function (result) {
            $scope.dat = result.data.Articles;
            console.log($scope.dat);
            $scope.user = { title: '', description: '' };
            console.log("edit");
        });
    }
    $scope.submit = function () {
        $http.post('/api/Articles/Forminfo', $scope.user)
            .success(function (data, status, headers, config) {
                $scope.myForm.$setPristine();
                $scope.user = { title: '', description: '' };
                console.log("post ok");
                $scope.currentPage = 1;
                $http.get('/api/Articles/Getnext/' + $scope.currentPage).then(function (result) {
                    $scope.totalpage = result.data.total;
                    if (result.data.Articles.length != 0) {
                        $scope.enablepagi = true;
                    }
                    else {
                        $scope.enablepagi = false;
                    }
                    $scope.dat = result.data.Articles;
                    $scope.popsuccess = function () {
                        toaster.pop('note', "تمة الإضافة بنجاح", "");
                    };
                    $scope.popsuccess();
                    console.log($scope.dat);
                });
            })
            .error(function (data, status, headers, config) {
                $scope.popfailed = function () {
                    toaster.pop('error', "لم تتم الإضافة ", "");
                };
                console.log("post not ok");

                $scope.popfailed();

            });
    }

    $scope.deletearticle = function (val) {

        $http.delete('/api/Articles/DeleteArticles/' + val)
            .success(function (data, status, headers, config) {
                $http.get('/api/Articles/Getnext/' + $scope.currentPage).then(function (result) {
                    $scope.totalpage = result.data.total;
                    $scope.dat = result.data.Articles;
                    if (result.data.Articles.length != 0) {

                        $scope.enablepagi = true;
                    }
                    else {
                        if ($scope.currentPage != 1) {
                            $scope.currentPage--;
                            $scope.enablepagi = true;
                            $http.get('/api/Articles/GetNext/' + $scope.currentPage).then(function (resultt) {

                                $scope.totalpage = result.data.total;
                                $scope.dat = resultt.data.Articles;
                            });
                        }
                        else { $scope.enablepagi = false; }

                    }
                    $scope.popsuccess = function() {
                        toaster.pop('note', "تمة الحذف بنجاح", "");
                    };
                    $scope.popsuccess();

                    console.log("deletepost ok");


                });

            })
            .error(function (data, status, headers, config) {
                $scope.popfailed = function () {
                    toaster.pop('error', "لم يتم الحذف بنجاح  ", "");
                };
            

                $scope.popfailed();
                console.log("deletepost not ok");

            });
    }
});



mhdapp.controller("article", function ($scope, $routeParams, $http, $window, toaster) {
    $scope.back = function () {
        $window.history.back();
    }
    console.log("article controller");
    $scope.idv = $routeParams.num;

    $http.get('/api/Articles/Getnew/' + $scope.idv).then(function (result) {
        sessionStorage.articlesession = sessionStorage.pagesession;
        $scope.data = result.data;
        console.log($scope.data);
        console.log($scope.idv);
        console.log($scope.data[0]);
    });
});


mhdapp.controller("editarticle", function ($scope, $routeParams, $http, $location, $window, toaster, $timeout) {
    
   

    $scope.back = function () {
        $window.history.back();
        //window.scrollTo(x - 0, y - 0);
    }
    console.log("EDIT article contoller");
    $scope.idv = $routeParams.num;

    $http.get('/api/Articles/Getnew/' + $scope.idv).then(function (result) {

        $scope.dat = result.data;
        $scope.user = { title: $scope.dat.Title, description: $scope.dat.Description };
        $scope.showtitle = $scope.dat.Title;
    });

    $scope.editart = function () {
        $http.put('/api/Articles/Editarticle/' + $scope.idv, $scope.user)
            .success(function (data, status, headers, config) {
                $scope.popsuccess = function () {
                    toaster.pop('note', "تم التعديل بنجاح", "");
                };
                console.log("put ok");
                $scope.popsuccess();
                $timeout($location.path("/viewarticles"), 30000);
            })
            .error(function (data, status, headers, config) {
                $scope.popfailed = function () {
                    toaster.pop('error', "لم يتم التعديل بنجاح ", "");
                };
                console.log("put not ok");
                console.log("post not ok");
                $scope.popfailed();
            });
    }
});



mhdapp.controller("mainpagectrl", function ($scope, $routeParams, $http, $window, toaster) {

    console.log("mainpage contoller");
    

 /*   $http.get('/api/MainPage/Getlecture').then(function (result) {
        $scope.lec = result.data;
        console.log("lec info",$scope.lec);
        
    });*/


    $http.get('/api/MainPage/Getnews').then(function (result) {
        $scope.new = result.data;
        console.log("News info", $scope.new);

    });


    $http.get('/api/MainPage/Getarticle').then(function (result) {
        $scope.article = result.data;
        console.log("article info", $scope.article);

    });
});

mhdapp.controller("vidogularmainpage", function ($scope, $routeParams, $http, $sce) {
    console.log("videogularmainpage Ctrl");
    var local = "http://localhost:1322";
    var online = "http://sayedalshohada.azurewebsites.net";
    var url = local;
    var that = this;

    $http.get('/api/MainPage/Getlecture' ).then(function (result) {
        $scope.v4 = url+result.data.Vlocation;
        console.log($scope.v4 + "v4loc");
        that.config = {
            sources: [
                { src: $sce.trustAsResourceUrl($scope.v4), type: "video/mp4" }
            ],
            theme: "../Scripts/bower_components/videogular-themes-default/videogular.css",
            plugins: {
                poster: $sce.trustAsResourceUrl("http://www.videogular.com/assets/images/videogular.png")
            }

        };
    });
});