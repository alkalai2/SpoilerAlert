$(document).ready(function(){
	console.log("ready in settings.js");
	$( "#slider" ).slider();
    $("#slider").width(100).height(8);
    $( "#check" ).button();
    $(".btn-default").eq(3).addClass("btn-info");

    var curr = 4;

    $( ".btn-default" ).hover(
      function() {
      	var temp = $(this).text();

        $("#facebook").css("text-shadow", "0 0 " + 5-temp/2   + "px rgba(0,0,0,0.5)");
        $(".fb_p").css("opacity", temp/10);
        $(".fb_img").css("opacity",temp/10);
      }, function() {
        $("#facebook").css("text-shadow", "0 0 " + curr + "px rgba(0,0,0,0.5)");
        $(".fb_p").css("opacity", curr/10);
        $(".fb_img").css("opacity", curr/10);
      }
    );
    $(".btn-default").click(function(){
    	
    	$(".btn-default").eq(curr-1).removeClass("btn-info");
    	// $(this).removeClass("btn-default");
    	$(this).addClass("btn-info");
    	curr = $(this).text();

    });


    $("#IL").minicolors();

    $("#IL").minicolors({
        change: function() {
            console.log($(this).value());
        }
    });
    // var x = 0;
    // $("#facebook").css("text-shadow", "0 0 " + x + "px rgba(0,0,0,0.5)");
    // $(".fb_p").css("opacity", "0.1");
    // $(".fb_img").css("opacity", "0.1");

});