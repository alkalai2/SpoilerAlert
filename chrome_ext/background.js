/**
 * Holds the background process for the extension
 * Main logic for the extension exists here
 */

/**
 * run when the extension is first installed
 * assures that the local storage is initialized (maybe on/off function)
 *
chrome.runtime.onInstalled.addListener(function(details) {
    localStorage["spoiler_alert"] = true;
});*/

chrome.tabs.onUpdated.addListener(function(id, info, tab){
	console.log('URL: ' + tab.url);

	//checks to make sure that the page has completely loaded before attempting to inject a script
	if (tab.status !== "complete"){
        return;
    }

    //checks that the site is facebook.com
    //this can be changed to later accomodate a lot more sites
    if(tab.url.toLowerCase().indexOf('facebook.com') >= 0){
    	console.log('On facebook.com');
    	
    	chrome.tabs.executeScript(null, {"file": "facebook_blocker.js"});
    }
});