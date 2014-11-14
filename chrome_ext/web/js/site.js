/*
    File to hold Javascript for SpoilerAlert site
*/
$(function(){

	// $("#myform").submit(function(event){
	// 	var thehtml = '<li style = "display:none"> ' + $("input:first").val + '<span class="ui-icon ui-icon-closethick"></span> </li>';
	// 	$(thehmtml).prependTo("#termBank").fadeIn('slow');
	// 	$(this).val("");
	// 	event.preventDefault();
	// })

	$("#autocomplete2").focus();

	// if($(".aligned").length==0){
	// 	console.log("there exists an empty list..")
	// 	$(".package").append('<li class = "listHolder"> NO TERMS ADDED </li>');
	// }

	function FooBar(){
		alert("FOOBAR");
	}
	$( "#myform" ).submit(function( event ) {
		var term = $("input:first").val();
    	var thehtml = '<li class = "aligned"style = "display:none"> ' + term + '<span class="inline ui-icon ui-icon-closethick" onclick="FooBar()"></span> </li>';
		$(thehtml).prependTo("#termBank").fadeIn('slow');
		//$(this).("input").val("");
		$("#autocomplete2").val("");

		$(".listHolder").remove();
		event.preventDefault();
    		return;
  				
	});

	 $("text:last").css("fill","#f2f2f2");
})