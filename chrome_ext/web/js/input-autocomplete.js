$(function(){

        

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

  
  // setup autocomplete function pulling from currencies[] array
  
  // $('#autocomplete').autocomplete({

  //   lookup: packagesDict,
  //   onSelect: function (suggestion) {

  //     var thehtml = '<li style = "display:none"> ' + suggestion.value + '<span class="ui-icon ui-icon-closethick"></span> </li>';
  //     $(thehtml).prependTo('#'+suggestion.data+'Bank').fadeIn('slow');
  //     console.log("resetig with 'forid' .. ");
  //   }
  // });


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
                    // manually update the textbox and hidden field

                    var thehtml = '<li class = "aligned"style = "display:none"> ' + ui.item.value + '<span class="inline ui-icon ui-icon-closethick" ></span> </li>';
                  $(thehtml).prependTo('#'+ui.item.data+'Bank').fadeIn('slow');
                    $(this).val("");
                }
            });



});