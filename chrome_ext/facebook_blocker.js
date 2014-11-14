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
	var termsString = localStorage['AllTerms02021994SpoilerAlert'];
	result = ["CELTICS"];
	var splitArray = termsString.split('|$|');
	console.log(splitArray);
	return result;
}

/**
 * 
 */
function blockFacebookItem(item){
	//block out all of the shitty text
	var paragraphs = item.getElementsByTagName('p');
	for(var i = 0; i < paragraphs.length; i++){
		paragraphs[i].style.color='transparent';
		paragraphs[i].style.textShadow='0 0 5px rgba(0,0,0,0.5)';
	}

	//block shitty images and videos

	//put filters on top of post while changing the opacity
	var nodes = item.childNodes;
  	for(var i = 0; i < nodes.length; i++){
  		nodes[i].style.opacity=.2;
  	}
  	item.style.backgroundColor='#158BE8';//actual background color: #e9eaed
  	
  	var para = document.createElement("p");
	var node = document.createTextNode("Possible Spoiler");
	para.appendChild(node);
	item.appendChild(para);
}

/**
 * @param post - html element of a facebook post
 * @returns - true if script should block this post, false if it shouldnt
 */
function shouldBlock(post){
	var blockedWords = getBlockedWords();
	for(var i = 0; i < blockedWords.length; i++){
		if(post.innerHTML.toUpperCase().indexOf(blockedWords[i]) != -1){
			return true;
		}
	}
	return false;
}

/**
 * @param posts - array of facebook feed posts
 */
function blockSpoilerPosts(posts){
	for(var i = 0; i < posts.length; i++){
		if(shouldBlock(posts[i])){
			blockFacebookItem(posts[i]);
		}
	}
}

/**
 * Returns an array with the div elements for each individual newsfeed Story on Facebook
 */
 function getNewsfeedStories(){
 	//class code of newsfeed post '_5pcr' or '_3ccb' (does not include the commment)
 	//class codes for one level up - _4-u2 mbm _5jmm _5pat _5v3q _5x16 _2l4l _x72 (not sure if it includes the comment)
  	var newsfeedStories = document.getElementsByClassName('_5jmm');
  	return newsfeedStories;
 }

/**
 * Controller function that will delegate to other functions
 */
function facebookBlocker(){
	console.log('executing blocking');
	var newsfeedStories = getNewsfeedStories();
	var blockedStories = blockSpoilerPosts(newsfeedStories);
}

console.log('got inside of the facebook_blocker.js');
facebookBlocker();
document.addEventListener("scroll", facebookBlocker);