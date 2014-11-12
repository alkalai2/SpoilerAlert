/**
 * This class block all feeds on Facebook that the user specifies.
 * 
 * Steps:
 * 	- get html from facebook
 *	- order all posts
 * 	- search for specified blocked posts
 *	- run javascript to block all of those specified elements
 */

function facebookBlocker(){
	console.log('executing blocking');
}

console.log('got inside of the facebook_blocker.js');
facebookBlocker();
document.addEventListener("scroll", facebookBlocker);