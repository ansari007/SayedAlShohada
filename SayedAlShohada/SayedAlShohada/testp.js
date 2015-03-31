var mhdapp = angular.module("mhdapp", ['ngRoute', 'ngAnimate', 'toaster', "ngSanitize",
			"com.2fdevs.videogular",
			"com.2fdevs.videogular.plugins.controls",
			"com.2fdevs.videogular.plugins.overlayplay",
			"com.2fdevs.videogular.plugins.poster"]);
mhdapp.config(["$routeProvider", function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: "Index.html",
        controller: "c1"




    }).
    when("/viewinbox", {
        templateUrl: "viewinbox.html",
        controller: "inbox"


    })
        .when("/viewmessage/:num", {
            templateUrl: "viewmessage.html",
            controller: "messages"


        })

          .when("/login", {
              templateUrl: "SignIn.html",
              controller: "c1"


          })



    .when("/index", {
        templateUrl: "index.html",
        controller: "c1"


    })

        .when("/view3", {
            templateUrl: "view3.html",
            controller: "c3"


        })


            .when("/lecturectrl", {
                templateUrl: "lecturectrl.html",
                controller: "c3"


            })

           .when("/createlecture", {
               templateUrl: "createlecture.html",
               controller: "c3"
           })


         .when("/editnews/:num", {
             templateUrl: "editnews.html",
             controller: "editCtrl"
         })

         .when("/editlecture/:num", {
             templateUrl: "editlecture.html",
             controller: "editlecCtrl"
         })

            .when("/view4/:num", {
                templateUrl: "view4.html",
                controller: "viewlecture"


            })


    .otherwise({
        redirectTo: "index"
    }


    );


}
]);
mhdapp.controller("c1", function ($scope) {

    console.log("gtrgtrg");
}
);







mhdapp.controller("c3", ["$scope", "$routeParams", "$http", "$location", '$route', '$window',c3]);
function c3($scope, $routeParams, $http, $location, $route, $window) {
    $scope.currentPage = 1;
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

                  $scope.dat = result.data.news;
                  console.log($scope.dat);

                  console.log("second httpget lectures");

              });

              console.log("deletepost ok lecture");


          }).
  error(function (data, status, headers, config) {
      console.log("deletepost not ok lecture");

  });

    }



    $scope.changestatus = function (id, val2) {
        if (val2 == 10||val2==30) {

            $http.put('/api/Lectures/Publish/'+id).
                success(function(data, status, headers, config) {
                    $http.get('/api/Lectures/GetNext/' + $scope.currentPage).then(function (result) {

                        $scope.dat = result.data.news;
                        console.log($scope.dat);

                        console.log("second httpget lectures");

                    });

                    console.log("statusupdate ok lecture");


                }).
                error(function(data, status, headers, config) {
                    console.log("deletepost not ok lecture");

                });
        }





        if (val2 == 20) {

            $http.put('/api/Lectures/Withdraw/'+id).
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


mhdapp.controller("inbox", function ($scope, $routeParams, $http, $route,toaster) {

    
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
                console.log($scope.dat);


            });
        }
    }

    $scope.pagiprevious = function () {
        if ($scope.currentPage > 1) {


            $scope.currentPage--;
            sessionStorage.pagesession = $scope.currentPage;

            $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {


                $scope.dat = result.data.news;
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

        $http.post('/api/Messages/Forminfo', $scope.user).
          success(function (data, status, headers, config) {
              $scope.myForm.$setPristine();
              $scope.user = { title: '', description: '' };
              console.log("post ok");
              $http.get('/api/Messages/Getnext/' + 1).then(function (result) {

                  $scope.dat = result.data.news;

                  $scope.popsuccess = function () {
                      toaster.pop('note', "تمة الإضافة بنجاح", "");
                  };
                  $scope.popsuccess();
               
                 
                  
             
                  console.log($scope.dat);

              });

          }).
  error(function (data, status, headers, config) {
      $scope.popfailed = function () {
          toaster.pop('error', "لم تتم الإضافة ", "");
      };
      console.log("post not ok");
      
      $scope.popfailed();
    
  });

    }

    $scope.deletenews = function (val) {

        $http.delete('/api/Messages/Deletenews/' + val).
          success(function (data, status, headers, config) {
              $http.get('/api/Messages/Getnext/' + $scope.currentPage).then(function (result) {

                  $scope.dat = result.data.news;
                  console.log($scope.dat);

                  console.log("second httpget");

              });

              console.log("deletepost ok");


          }).
  error(function (data, status, headers, config) {
      console.log("deletepost not ok");

  });

    }
});


mhdapp.controller("messages", function ($scope, $routeParams, $http,$window) {
    $scope.back=function() {
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



mhdapp.controller("editCtrl", function ($scope, $routeParams, $http, $location,$window) {
    $scope.back = function () {
        $window.history.back();
        //window.scrollTo(x - 0, y - 0);
    }
    console.log("EDIT contoller");
    $scope.idv = $routeParams.num;

    $http.get('/api/Messages/Getnew/'+ $scope.idv).then(function (result) {

        $scope.dat = result.data;
        $scope.user = { title: $scope.dat.Title, description: $scope.dat.Description };
        $scope.showtitle = $scope.dat.Title;
    });


    $scope.editnews = function () {


        $http.put('/api/Messages/Editnew/'+ $scope.idv, $scope.user).
          success(function (data, status, headers, config) {


              console.log("put ok");
              $(".submitsuccess").removeClass("cssFade");

              setTimeout(function () {
                  $(".submitsuccess").addClass("cssFade");

              }, 500);
              $location.path("/viewinbox");
              //setTimeout(function () {
                 
              //    $location.path("/viewinbox");
              //}, 2000);
             

          }).
  error(function (data, status, headers, config) {
      console.log("put not ok");

  });

    }


});

mhdapp.controller("viewlecture", function ($scope, $routeParams, $http,$window) {

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


});




mhdapp.controller("vidogularv4", function ($scope, $routeParams, $http, $sce) {
    console.log("videogularv4 Ctrl");

    var that = this;

    $http.get('/api/Lectures/Getlec/' + $scope.idv).then(function (result) {
        $scope.v4 = result.data.Vlocation;
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



mhdapp.controller("editlecCtrl", function ($scope, $routeParams, $http, $location, $window) {
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


        $http.put('/api/Lectures/Putlec/' + $scope.idv, $scope.user).
          success(function (data, status, headers, config) {


              console.log("put lec ok");
              $location.path("/lecturectrl");

          }).
  error(function (data, status, headers, config) {
      console.log("put lec not ok");

  });

    }


});



mhdapp.controller("logctrl", function ($scope, $routeParams, $http, $location, $window, toaster) {
  console.log("login ctrl");
    $scope.user = { username: '', password: '' };
    $scope.verif = true;
    $scope.verif2 = false;
    $scope.popfailed = function () {
        toaster.pop('error', "Invalid username or password ", "");
    };
    console.log("post not ok");

   
    $scope.logverif= function() {


        $http.post('/api/Login/Verif', $scope.user).then(function(result) {
            $scope.verif = result.data;
            if ($scope.verif == false) {
                $scope.verif = true;
                $scope.popfailed();
            } else {
                $scope.verif2 = $scope.verif;
                $scope.verif = false;
            }
            console.log($scope.verif2);

        });


    }


});