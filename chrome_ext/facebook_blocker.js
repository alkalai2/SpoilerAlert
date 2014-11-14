/**
 * This class block all feeds on Facebook that the user specifies.
 * 
 * Steps:
 * 	- get html from facebook
 *	- order all posts
 * 	- search for specified blocked posts
 *	- run javascript to block all of those specified elements
 */

var AllTermsString = '|$|';

/**
 * Goes into Chrome memory and retrieves all blocked words
 * 
 * @returns - an array of strings of all blocked words
 */
function getBlockedWords(){
	//Gets data from local storage
	chrome.extension.sendMessage({storage: 'AllTerms02021994SpoilerAlert'}, function(response) {
		AllTermsString = response.storage;
	});

	var termsString = AllTermsString;
	var splitArray = termsString.split('|$|');
	console.log('Terms to block: ' + splitArray);
	return splitArray;
}

/**
 *
 */
function unblockPost(item, div){
	console.log("unblocking post!");

	var paragraphs = item.getElementsByTagName('p');
	for(var i = 0; i < paragraphs.length; i++){
		paragraphs[i].style.color='#141823';
		paragraphs[i].style.textShadow='initial';
	}

	//block shitty images and videos

	//put filters on top of post while changing the opacity
	var nodes = item.childNodes;
  	for(var i = 0; i < nodes.length; i++){
  		nodes[i].style.opacity=1;
  	}
  	item.style.backgroundColor='#fff';//'#3B5998';//actual background color: #e9eaed
  	item.style.pointerEvents='auto';

  	//changing the div
  	div.style.zIndex=-10;
  	div.style.visibility='hidden';
}

/**
 * 
 */
function blockFacebookItem(item, term){

	if(!item)
		return;

	var nodes = item.childNodes;

	var unblocked = nodes[0].getAttribute('id');
	if(item.style.pointerEvents==='none' || unblocked === 'SpoilerAlertBlockingDiv')
		return;

	//block out all of the shitty text
	var paragraphs = item.getElementsByTagName('p');
	for(var i = 0; i < paragraphs.length; i++){
		paragraphs[i].style.color='transparent';
		paragraphs[i].style.textShadow='0 0 5px rgba(0,0,0,0.5)';
	}

	//block shitty images and videos

	//put filters on top of post while changing the opacity
  	for(var i = 0; i < nodes.length; i++){
  		nodes[i].style.opacity=.1;
  	}
  	item.style.backgroundColor='#E1E1DA';//'#3B5998';//actual background color: #e9eaed
  	item.style.pointerEvents='none';
  	
  	var div = document.createElement("div");
  	div.onclick=function(){
  		console.log("inside listner...");
  		unblockPost(item, div);
  	};
  	div.style.backgroundColor='#3498db';
  	div.style.opacity=.9;
  	div.setAttribute("id", "SpoilerAlertBlockingDiv");
  	div.innerHTML = '<p style="font-size: 20px; color: #FFD42A;">SPOILER ALERT</p>'
  		+ '<p style="font-size: 13px;">Post contained a Possible Spoiler</p>'
  		+ '<p style="font-size: 13px; color: #5E15CF;">'+ term + '</p>';

  	div.whiteSpace="nowrap";
  	div.style.minWidth=(item.offsetWidth - 50).toString() + 'px';
  	div.style.maxWidth=(item.offsetWidth - 50).toString() + 'px';
  	div.style.maxHeight=(item.offsetHeight - 30).toString() + 'px';

  	div.style.marginLeft="25px";
  	div.style.marginRight="25px";
  	div.style.marginTop="15px";
  	div.style.marginBottom="15px";
  	div.style.borderRadius="4px";
  	div.style.boxShadow="1px 1px 1px #999999";

  	div.style.textAlign="center";
	div.style.position="absolute";
	div.style.top="0px";
	div.style.left="0px";
	div.style.zIndex=10;
	item.insertBefore(div, nodes[0]);
	div.style.pointerEvents='auto';
}

/**
 * @param post - html element of a facebook post
 * @returns - true if script should block this post, false if it shouldnt
 */
function shouldBlock(post){
	var blockedWords = getBlockedWords();
	for(var i = 1; i < blockedWords.length-1; i++){
		if(post.innerHTML.toUpperCase().indexOf(blockedWords[i].toUpperCase()) != -1){
			return blockedWords[i];
		}
	}
	return undefined;
}

/**
 * @param posts - array of facebook feed posts
 */
function blockSpoilerPosts(posts){
	for(var i = 0; i < posts.length; i++){
		var toBlock = shouldBlock(posts[i]);
		if(toBlock){
			blockFacebookItem(posts[i], toBlock);
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
	blockSpoilerPosts(newsfeedStories);
	blockFacebookItem(newsfeedStories[0]);
	blockFacebookItem(newsfeedStories[1]);
}

/**
 * Called when Facebook is first loaded
 */
function initFacebookBlocker(){
	//Gets data from local storage
	chrome.extension.sendMessage({storage: 'AllTerms02021994SpoilerAlert'}, function(response) {
		console.log('response => ' + response.storage);
		AllTermsString = response.storage;
	});
	setTimeout(facebookBlocker, 500);
	facebookBlocker();
}

console.log('got inside of the facebook_blocker.js');
initFacebookBlocker();
document.addEventListener("scroll", facebookBlocker);
