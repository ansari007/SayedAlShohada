$(document).ready(function () {
    setTimeout(function () {

        var videoUrl = "";
        window.addEventListener('message', function (e) {
            videoUrl = e.data;;
            if (videoUrl == "") {
                alert("nothing here");
            } else {
                setTimeout(function () {
                    jwplayer("player").setup({
                        file: videoUrl,
                        width: "100%",
                        image: "Content/pic/videothub.jpg"
                    });
                });
            }
        });
    });

    //setTimeout(function () {
    //    var videoUrl = "";
    //    window.addEventListener('message', function (e) {
    //        videoUrl = e.data;

    //        if (videoUrl == "") {
    //            alert("nothing here");
    //        } else {
    //            setTimeout(function () {
    //                jwplayer("playerlec").setup({
    //                    file: videoUrl,
    //                    width: "100%",
    //                    image: "Content/pic/videoexample.jpg"
    //                });
    //            });
    //        }
    //    });
    //});
});