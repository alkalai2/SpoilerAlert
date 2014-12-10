/*
    File to hold Javascript for SpoilerAlert site
*/
$(document).ready(function(){
	console.log("ready in site.js");
	// On Load JS
	$("#autocomplete2").focus();
	populateBanks();  
	console.log("newshit");
    


	


	 // AUTO COMPLETE  and Suggested Terms

		  	var shows = [
		        {value: 'Game of Thrones', data: 'show'},
		        {value: 'Orange is the New Black', data: 'show'},
		        {value: 'Friends', data: 'show'},
		        {value: 'Silicon Vallye', data: 'show'},
		        {value: 'Arrested Developement', data: 'show'},
		        {value: 'Seinfeld', data: 'show'},
		        {value: 'Southpark', data: 'show'},
		        {value: 'Triptank', data: 'show'},
		        {value: 'Cow and Chicken', data: 'show'},
		        {value: 'Gossip Girl', data: 'show'},
		        {value: 'SpongeBob Squareparents', data: 'show'},
		         {value: 'House of Cards', data: 'show'},
		          {value: 'Heroes', data: 'show'}
		    ]
		    var nhlteams = [
		        {value: 'Atlanta Thrashers', data: 'team'},
		        {value: 'Boston Bruins', data: 'team'},
		        {value: 'Buffolo Sabres', data: 'team'},
		        {value: 'Calgary Flames', data: 'team'},
		        {value: 'Carolina Hurricanes', data: 'team'},
		        {value: 'Chicago Blackhawks', data: 'team'},
		        {value: 'Colorado Avalanche', data: 'team'},
		        {value: 'Columbus Blue Jackets', data: 'team'},
		        {value: 'Dallas Sabres', data: 'team'},
		        {value: 'Detroit Red Wings', data: 'team'},
		        {value: 'Edmonton Oilers', data: 'team'},
		        {value: 'Florida Panthers', data: 'team'},
		        {value: 'Minnesota Wild', data: 'team'},
		        {value: 'Montreal Canadiens', data: 'team'},
		        {value: 'Nashville Predators', data: 'team'},
		        {value: 'New Jersey Devils', data: 'team'},
		        {value: 'New York Islanders', data: 'team'},
		        {value: 'New York Rangers ', data: 'team'},
		        {value: 'Ottawa Senators', data: 'team'},
		        {value: 'Philadelphia Flyers', data: 'team'},
		        {value: 'Pheonix Coyotes', data: 'team'},
		        {value: 'Pittsburgh Penguins', data: 'team'},
		        {value: 'Saint Louis Blues', data: 'team'},
		        {value: 'San Joes Sharks', data: 'team'},
		        {value: 'Tampa Bay Lightning', data: 'team'},
		        {value: 'Toronto Maple Leafs', data: 'team'},
		        {value: 'Vanvouver Canucks', data: 'team'},
		        {value: 'Washington Capitals', data: 'team'}
		    ]

		    var nbateams = [
		        {value: 'Atlanta Hawks', data: 'team'},
		        {value: 'Boston Celtics', data: 'team'},
		        {value: 'Charlotte Hornets', data: 'team'},
		        {value: 'Chicago Bulls', data: 'team'},
		        {value: 'Cleveland Cavaliers', data: 'team'},
		        {value: 'Dallas Mavericks', data: 'team'},
		        {value: 'Denver Nuggets', data: 'team'},
		        {value: 'Detroit Pistons', data: 'team'},
		        {value: 'Golden State Warrios', data: 'team'},
		        {value: 'Houston Rockets', data: 'team'},
		        {value: 'Indiana Pacers', data: 'team'},
		        {value: 'Los Angeles Clippers', data: 'team'},
		        {value: 'Los Angeles Lakers', data: 'team'},
		        {value: 'Memphis Grizzlies', data: 'team'},
		        {value: 'Miami Heat', data: 'team'},
		        {value: 'Milwaukee Bucks', data: 'team'},
		        {value: 'Minnesota Timberwolves', data: 'team'},
		        {value: 'New Jersey Nets ', data: 'team'},
		        {value: 'New Orleans Pelicans', data: 'team'},
		        {value: 'New York Knicks', data: 'team'},
		        {value: 'Oklahoma City Thunder', data: 'team'},
		        {value: 'Orlando Magic', data: 'team'},
		        {value: 'Philadelphia Sixers', data: 'team'},
		        {value: 'Phoenix Suns', data: 'team'},
		        {value: 'Portland Trailblazers', data: 'team'},
		        {value: 'Sacramento Kings', data: 'team'},
		        {value: 'San Antonio Spurs', data: 'team'},
		        {value: 'Toronto Raptors', data: 'team'},
		        {value: 'Utah Jazz', data: 'team'},
		        {value: 'Washington Wizards', data: 'team'}
		    ]


		var packagesDict = nhlteams.concat(shows).concat(nbateams);

    	// AutoComplete and addition to local Storage

            $("#autocomplete2").autocomplete({
                appendTo: "#ouputcontent",
                source: packagesDict,
                focus: function(event, ui) {
                    // prevent autocomplete from updating the textbox
                    event.preventDefault();
                    // manually update the textbox
                    $(this).val(ui.item.label);
                },
                select: function(event, ui) {
                    // prevent autocomplete from updating the textbox
                    event.preventDefault();

                    // add term to local storage
                    if(storeData(ui.item.value, ui.item.data) > 0)
                		// add term to bank
                		updateBanks(ui.item.value);
               		
               		// clear frm
                    $(this).val("");
                }
            });


            $(".bankList").on('click', '.ui-icon-closethick', close
            // 	function(){
            
            // 	//$(this).parent().fadeOut(150);
            

            // }
            );

		$( "#myform" ).on("submit", function( event ) {
			var term = $("input:first").val();

			if(storeData(term, "indiv") > 0)
            		// add term to bank
            		updateBanks(ui.item.value);
	    	
            console.log("added: " + term);		
			$("#autocomplete2").val("");
			event.preventDefault();
		});


		function close(){
			// remove element 
				var termRemove = this.parentNode.innerText;
				console.log("trying to remove " + termRemove + "...");

				removeFromStorage(termRemove);
				this.parentNode.remove();
		}

		// will add term to 'AllTerms' key and create a key-dict relationship in local storage
		// @param - the inputted package or term, eg 'New York Knicks' or '!!'
		function storeData(term, data){
			term = term.trim();
			var key = 'Term'+term.toUpperCase().split(' ').join('_') + '02021994SpoilerAlert';
			if(localStorage[key] === undefined){
				var str = localStorage['AllTerms02021994SpoilerAlert'];
	            localStorage['AllTerms02021994SpoilerAlert'] = str + term + '|$|';
	            console.log("after insertion: " + localStorage['AllTerms02021994SpoilerAlert']);

	            localStorage[key] = data;
	            console.log("inserted localStorage["+key+"]: "+data);
	            return 1;
	        }
	        else{
	        	return -1;
	        }

		}

		function removeFromStorage(term){
			console.log("term:" + term + ".");
			var termString = localStorage['AllTerms02021994SpoilerAlert'];
			console.log("before removal: " + termString);
			
			localStorage['AllTerms02021994SpoilerAlert'] = termString.replace(term+'|$|', "");
			console.log("after removal: " + localStorage['AllTerms02021994SpoilerAlert']);
			var myKey = 'Term'+term.toUpperCase().split(' ').join('_') + '02021994SpoilerAlert';
			localStorage.removeItem(myKey);
		}

		function populateBanks(){
        // will be called on initial page loads
        // create term array

        	if(localStorage['AllTerms02021994SpoilerAlert']!==null){
        		console.log("current AllTerms: " + localStorage['AllTerms02021994SpoilerAlert'])
		        var terms = localStorage['AllTerms02021994SpoilerAlert'].split('|$|');
		        console.log("current AllTerms stripped : " + localStorage['AllTerms02021994SpoilerAlert'].split('|$|'));
		        for(var i = 0; i < localStorage.length-1; i++){
		            if(terms[i]!==undefined){
		                var myKey = 'Term'+terms[i].toUpperCase().split(' ').join('_') + '02021994SpoilerAlert';
		                
		                // term is in our storage, present it on site
		                if(localStorage[myKey] !== undefined){
		                    var myType = localStorage[myKey]; // myType = 'show' , 'team', or 'indiv'

		                    // add to appropriate bank
		                    var thehtml = '<li class = "aligned"style = "display:none"> ' + terms[i] + '<span class="inline ui-icon ui-icon-closethick" ></span> </li>';
		                    console.log(thehtml);
		                    console.log(myType);
		                    $(thehtml).prependTo('#'+myType+'Bank').fadeIn('slow');
		                }
		            }
		        }
		    }
	    }

	    function updateBanks(term){
	        console.log("updating banks with "+ term + " ...");
	        if(term!==undefined){
	                var myKey = 'Term'+term.toUpperCase().split(' ').join('_') + '02021994SpoilerAlert';
	                
	                // term is in our storage, present it on site
	                if(localStorage[myKey] !== undefined){
	                    var myType = localStorage[myKey]; // myType = 'show' , 'team', or 'indiv'

	                    // add to appropriate bank
	                    var thehtml = '<li class = "aligned"style = "display:none"> ' + term + '<span class="inline ui-icon ui-icon-closethick" ></span> </li>';
	                    console.log(thehtml);
	                    console.log(myType);
	                    $(thehtml).prependTo('#'+myType+'Bank').fadeIn('slow');
	                }
	            }
	    }

	
});