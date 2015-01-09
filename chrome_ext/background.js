/**
 * Holds the background process for the extension
 * Main logic for the extension exists here
 */

/**
 * run when the extension is first installed
 * assures that the local storage is initialized (maybe on/off function)
 */
chrome.runtime.onInstalled.addListener(function(details) {
	localStorage.clear();
    localStorage['OnOff02021994SpoilerAlert'] = true;
    localStorage['AllTerms02021994SpoilerAlert'] = "|$|";

    //blocking statistics initial values
    localStorage['TotalBlocked02021994SpoilerAlert'] = 0;
    localStorage['Totalshow02021994SpoilerAlert'] = 0;
    localStorage['Totalteam02021994SpoilerAlert'] = 0;
    localStorage['Totalindividual02021994SpoilerAlert'] = 0;

    //blocking settings initial values
    localStorage['SettingsContentOpacity'] = .1;
    localStorage['SettingsFilterOpacity'] = .7;
    localStorage['SettingsFilterColor'] = '102,102,102';
});

chrome.tabs.onUpdated.addListener(function(id, info, tab){
	console.log('URL: ' + tab.url);

	//checks to make sure that the page has completely loaded before attempting to inject a script
	// if (tab.status !== "complete"){
 //        return;
 //    }

    //checks that the site is facebook.com
    //this can be changed to later accomodate a lot more sites
    if(tab.url.toLowerCase().indexOf('facebook.com') >= 0){
    	console.log('On facebook.com');

    	//checks to make sure Spoiler Alert is set to on by the user
    	if(localStorage["OnOff02021994SpoilerAlert"] === "true")
    		chrome.tabs.executeScript(null, {"file": "facebook_blocker.js"});
    	
    	return;
    }
});

//access localStorage from facebook_blocker.js
// Background Page
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.storage) {
    // if (typeof request.value != 'undefined') {
    //   localStorage[request.storage] = request.value;
    // }
    sendResponse({resp: localStorage[request.storage]});
  }
  else if (request.totalPosts) {
  	// if (typeof request.value != 'undefined') {
   //    localStorage[request.totalPosts] = request.value;
   //  }
   	var totalBlocked = parseInt(localStorage[request.totalPosts]) + 1;
   	localStorage[request.totalPosts] = totalBlocked;

   	var type = localStorage['Term'+request.termValue+'02021994SpoilerAlert'];
   	var amountTermBlocked = parseInt(localStorage['Stats'+request.termValue+'02021994SpoilerAlert']) + 1;
   	localStorage['Stats'+request.termValue+'02021994SpoilerAlert'] = amountTermBlocked;

   	var amountTypeBlock = parseInt(localStorage['Total' + type + '02021994SpoilerAlert']) + 1;
   	localStorage['Total' + type + '02021994SpoilerAlert'] = amountTypeBlock;

    sendResponse({resp: totalBlocked});
  }
  else if (request.key){
  	var key = localStorage[request.key];
  	sendResponse({resp: key});
  }
  else {
    sendResponse({});
  }
});