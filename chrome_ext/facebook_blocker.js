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

	item.style.color='#141823';
	item.style.textShadow='initial';
	// var paragraphs = item.getElementsByTagName('p');
	// for(var i = 0; i < paragraphs.length; i++){
	// 	paragraphs[i].style.color='#141823';
	// 	paragraphs[i].style.textShadow='initial';
	// }

	//block shitty images and videos

	//put filters on top of post while changing the opacity
	var nodes = item.childNodes;
  	for(var i = 0; i < nodes.length; i++){
  		nodes[i].style.opacity=1;
  	}
  	item.style.background='#fff';//'#3B5998';//actual background color: #e9eaed
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
  	var holderDiv = item.firstChild;

  	if(!holderDiv)
  		return;

	if(item.style.pointerEvents==='none' || holderDiv.firstChild !== null)
		return;

	//block out all of the shitty text
	item.style.textShadow='0 0 5px rgba(0,0,0,0.5)';
	item.style.color='transparent';

	//block shitty images and videos

	//put filters on top of post while changing the opacity
  	for(var i = 1; i < nodes.length; i++){
  		nodes[i].style.opacity=.1;
  	}

  	item.style.pointerEvents='none';

  	//make the name + pic visible
  	//item.getElementsByClassName('clearfix')[0].style.zIndex=50;


  	//my additions for the divs
  	holderDiv.style.position="absolute";
	holderDiv.style.top="0px";
	holderDiv.style.left="0px";
	holderDiv.style.zIndex=9;
  	holderDiv.style.minWidth=(item.offsetWidth).toString() + 'px';
  	holderDiv.style.minHeight=(item.offsetHeight).toString() + 'px';
 	holderDiv.style.maxWidth=(item.offsetWidth).toString() + 'px';
	holderDiv.style.maxHeight=(item.offsetHeight).toString() + 'px';
	holderDiv.style.background='linear-gradient(rgba(59,89,152,.7), rgba(255,255,255,.7))';

  	
  	var div = createBlockingDiv(item.offsetWidth - 50, item.offsetHeight - 30, term, item);
  	div.onclick=function(){
  		unblockPost(item, holderDiv);
  	};
	holderDiv.appendChild(div);
	div.style.pointerEvents='auto';
}

function createBlockingDiv(width, height, term){
	var div = document.createElement("div");

  	var imgurl = chrome.extension.getURL("SpoilerAlert.png");

  	div.style.background='linear-gradient(rgba(0,0,0,.5), rgba(255,255,255,.7))';
  	div.setAttribute("id", "SpoilerAlertBlockingDiv");
  	div.innerHTML = makeLogo()
  		+ '<p style="font-size: 13px;">Post contained a Possible Spoiler</p>'
  		+ '<p style="font-size: 13px; color: #5E15CF;">'+ term + '</p>';

  	div.whiteSpace="nowrap";
  	div.style.minWidth=width.toString() + 'px';
  	div.style.maxWidth=width.toString() + 'px';
  	div.style.maxHeight=height.toString() + 'px';

  	div.style.marginLeft="25px";
  	div.style.marginRight="25px";
  	div.style.marginTop="15px";
  	div.style.marginBottom="15px";
  	div.style.borderRadius="4px";
  	div.style.boxShadow="1px 1px 1px #999999";
  	div.style.lineHeight="10%";

  	div.style.color='#141823';
	div.style.textShadow='initial';
  	div.style.textAlign="center";
	div.style.position="absolute";
	div.style.top="0px";
	div.style.left="0px";
	div.style.zIndex=10;
	return div;
}

function makeLogo(){
	var style = "line-height: 1.5; font-size: 3em; font-weight: bolder; color: #fff; text-shadow: 1px 1px #000; background: #111; font-family: 'PT Sans', 'Helvetica Neue', Arial, sans-serif;";
	return  '<p style="' + style + '">SpoilerAlert</p>';
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
		var currentPost = posts[i];

		//check to make sure we have not already checked this post
		var isChecked = currentPost.firstChild.getAttribute('id') === "SpoilerAlertHolderDiv";
		if(isChecked)
			return;
		/*
			insert newest div about blocker holder here... 
			- make div and give it a class name
			- check for this div before calling shouldBlock
		*/
		var div = document.createElement("div");
		div.setAttribute("id", "SpoilerAlertHolderDiv");
		currentPost.insertBefore(div, currentPost.firstChild);

		var toBlock = shouldBlock(currentPost);
		if(toBlock){
			blockFacebookItem(currentPost, toBlock);
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
	blockFacebookItem(newsfeedStories[0], "testing");
}

/**
 * Called when Facebook is first loaded
 */
function initFacebookBlocker(){
	//Gets data from local storage
	chrome.extension.sendMessage({storage: 'AllTerms02021994SpoilerAlert'}, function(response) {
		AllTermsString = response.storage;
	});
	setTimeout(facebookBlocker, 500);
	facebookBlocker();
}

console.log('got inside of the facebook_blocker.js');
initFacebookBlocker();
document.addEventListener("scroll", facebookBlocker);
