$(document).ready(function () {
    setTimeout(function() {
       
        var k = "";
        window.addEventListener('message', function(e) {
            k = e.data;
            alert(e.data);
            if (k == "") {
                alert("nothing here");
            }
            else {
                setTimeout(function () {
                    jwplayer("player").setup({
                        file: k,
                    width: "100%",
                        /*image: "123myPoster.jpg"#2#*/
                    });
                }, 3000);
            }
        });
   
      
    });
});
