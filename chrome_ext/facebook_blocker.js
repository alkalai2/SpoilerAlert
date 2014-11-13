/**
 * This class block all feeds on Facebook that the user specifies.
 * 
 * Steps:
 * 	- get html from facebook
 *	- order all posts
 * 	- search for specified blocked posts
 *	- run javascript to block all of those specified elements
 */

/**
 * Goes into Chrome memory and retrieves all blocked words
 * 
 * @returns - an array of strings of all blocked words
 */
function getBlockedWords(){
	return ['the'];
}

/**
 * 
 */
function blockFacebookItem(item){
	var paragraphs = item.getElementsByTagName('p');
	console.log('number of paragraphs: ' + paragraphs.length);
	for(var i = 0; i < paragraphs.length; i++){
		paragraphs[i].style.backgroundColor='red';
	}
}

/**
 * Returns an array with the div elements for each individual newsfeed Story on Facebook
 */
 function getNewsfeedStories(){
 	//class code of newsfeed post '_5pcr' or '_3ccb' (does not include the commment)
 	//class codes for one level up - _4-u2 mbm _5jmm _5pat _5v3q _5x16 _2l4l _x72 (not sure if it includes the comment)
  	var newsfeedStories = document.getElementsByClassName("_5jmm");
  	return newsfeedStories;
 }

/**
 * Controller function that will delegate to other functions
 */
function facebookBlocker(){
	console.log('executing blocking');
	var newsfeedStories = getNewsfeedStories();
	for(var i = 0; newsfeedStories.length; i++){
  		var currentStory = newsfeedStories[i];
  		currentStory.style.backgroundColor="green";
  		blockFacebookItem(currentStory);
  	}
}

console.log('got inside of the facebook_blocker.js');
facebookBlocker();
document.addEventListener("scroll", facebookBlocker);