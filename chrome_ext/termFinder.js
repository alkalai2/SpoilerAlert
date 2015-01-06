self.onmessage = function(term, showOrSport){

	function httpGet(theUrl){
    	var xmlHttp = null;

    	xmlHttp = new XMLHttpRequest();
    	xmlHttp.open( "GET", theUrl, false );
    	xmlHttp.send( null );
    	return xmlHttp.responseText;
	}

	console.log("THE REQUEST: ");
	console.log(httpGet('http://www.nba.com/'));
	//item.data.value;
}

