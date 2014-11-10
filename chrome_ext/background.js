/**
 * Holds the background process for the extension
 * Main logic for the extension exists here


function click(event){
	console.log('got inside of the background script');
	console.log('Turning ' + tab.url + ' red!');
  	chrome.tabs.executeScript({
    	code: 'document.body.style.backgroundColor="red"'
  	});
}

chrome.browserAction.onClicked.addListener(click);*/

console.log('got here');