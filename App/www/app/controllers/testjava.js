$(document).ready(function () {
    setTimeout(function () {

        var k = "";
        window.addEventListener('message', function (e) {
            k = e.data;
            ;
            if (k == "") {
                alert("nothing here");
            }
            else {
                setTimeout(function () {
                    jwplayer("player").setup({
                        file: k,
                        width: "100%",
                        image: "Content/pic/videothub.jpg"
                       /* image: "http://sayedalshohada.azurewebsites.net/pic/videothub.jpg"*/
                    });
                });
            }
        });
    });
});


$(document).ready(function () {
    setTimeout(function () {

        var k = "";
        window.addEventListener('message', function (e) {
            k = e.data;

            if (k == "") {
                alert("nothing here");
            }
            else {
                setTimeout(function () {
                    jwplayer("playerlec").setup({
                        file: k,
                        width: "100%",
                        image: "Content/pic/videoexample.jpg"
                       /* image: "http://sayedalshohada.azurewebsites.net/pic/videoexample.jpg"*/
                    });
                });
            }
        });


    });
});
