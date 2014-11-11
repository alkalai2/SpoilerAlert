/**
 * Holds the background process for the extension
 * Main logic for the extension exists here
 */

chrome.tabs.onUpdated.addListener(function(id, info, tab){
	console.log('got inside of the listener');
	console.log(info);
});