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
var filterOpacity = '.7';
var contentOpacity = .1;
var filterColor = '102,102,102';
var currentPosts = [];
var previousCurrentPostsSize = 0;

/**
 * Goes into Chrome memory and retrieves all blocked words
 * 
 * @returns - an array of strings of all blocked words
 */
function getBlockedWords(){
	//Gets data from local storage
	chrome.extension.sendMessage({storage: 'AllTerms02021994SpoilerAlert'}, function(response) {
		AllTermsString = response.resp;
	});

	var termsString = AllTermsString;
	var splitArray = termsString.split('|$|');
	console.log('Terms to block: ' + splitArray);
	return splitArray;
}

function updateSettings(){
	chrome.extension.sendMessage({storage: 'SettingsContentOpacity'}, function(response) {
		contentOpacity = parseFloat(response.resp);
	});
	chrome.extension.sendMessage({storage: 'SettingsFilterOpacity'}, function(response) {
		filterOpacity = response.resp;
	});
	chrome.extension.sendMessage({storage: 'SettingsFilterColor'}, function(response) {
		filterColor = response.resp;
	});
}

/**
 * Adds various statistics to Chrome Memory
 *
 */
function updateStatistics(term){
	//add 1 to posts blocked posts
	//updates specific term and the show/sport/indv. term column
	chrome.extension.sendMessage({totalPosts: 'TotalBlocked02021994SpoilerAlert', termValue: term.toUpperCase()}, function(response) {
		console.log('Total Blocked: ' + response.resp);
	});
}

/**
 *
 */
function unblockPost(item, div){
	console.log("unblocking post!");

	// item.style.color='#141823';
	// item.style.textShadow='initial';
	// var paragraphs = item.getElementsByTagName('p');
	// for(var i = 0; i < paragraphs.length; i++){
	// 	paragraphs[i].style.color='#141823';
	// 	paragraphs[i].style.textShadow='initial';
	// }
	var nodes = item.childNodes;
	for(var i = 1; i < nodes.length; i++){
		nodes[i].style.textShadow='initial';
		nodes[i].style.color='#141823';
		//put filters on top of post while changing the opacity
		nodes[i].style.opacity=1;
		nodes[i].style.pointerEvents='auto';
	}

	// //put filters on top of post while changing the opacity
	// var nodes = item.childNodes;
 //  	for(var i = 0; i < nodes.length; i++){
 //  		nodes[i].style.opacity=1;
 //  	}
 //  	item.style.background='#fff';//'#3B5998';//actual background color: #e9eaed
 //  	item.style.pointerEvents='auto';

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
	for(var i = 1; i < nodes.length; i++){
		nodes[i].style.textShadow='0 0 5px rgba(0,0,0,0.5)';
		nodes[i].style.color='transparent';
		//put filters on top of post while changing the opacity
		nodes[i].style.opacity=contentOpacity;
		nodes[i].style.pointerEvents='none';
	}

	var link  = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
    link.media = 'all';
    document.getElementsByTagName('head')[0].appendChild(link);

  	//my additions for the divs
  	holderDiv.style.fontFamily='Open Sans';
  	holderDiv.style.position="absolute";
	holderDiv.style.top="0px";
	holderDiv.style.left="0px";
	holderDiv.style.zIndex=10;
  	holderDiv.style.minWidth=(item.offsetWidth).toString() + 'px';
  	holderDiv.style.minHeight=(item.offsetHeight).toString() + 'px';
 	holderDiv.style.maxWidth=(item.offsetWidth).toString() + 'px';
	holderDiv.style.maxHeight=(item.offsetHeight).toString() + 'px';
	holderDiv.style.background='linear-gradient(rgba('+filterColor+','+filterOpacity+'), rgba(255,255,255,'+filterOpacity+'))';
  	
  	//sizing
  	var imageSize = item.offsetHeight/2;
  	if(imageSize > 300)
  		imageSize = 300;
  	var textSize = item.offsetHeight/10;
  	if(textSize > 25)
  		textSize = 25;
  	var spacing = 30 + item.offsetHeight/10;
  	if(spacing >200)
  		spacing = 200;

  	//adding content on top of the holderDiv
	var imgurl = chrome.extension.getURL("SpoilerAlert.png");
	holderDiv.style.lineHeight=spacing.toString() + '%';
	holderDiv.style.textAlign="center";
	holderDiv.innerHTML = '<br><br><img src="' + imgurl +'" id="SpoilerAlertImage" style="width:'+imageSize.toString()+'px+;height:'+imageSize.toString()+'px;">' //alt="Mountain View" style="width:304px;height:228px">'
		+ '<p style="font-size: '+ textSize.toString()+'px; color: #555555;">Post contained a Possible Spoiler</p>'
		+ '<p style="font-size: '+ textSize.toString()+'px; color: #2B919B;">'+ term + '</p>';

	var image = holderDiv.childNodes[2];
	
	//listeners
	image.onclick=function(){
  		unblockPost(item, holderDiv);
  	};
  	image.onmouseover=function(){
  		//holderDiv.style.border = "thick solid #36C0CD";
  		image.style.boxShadow='0px 0px 10px #555555';
  		var radius = item.offsetHeight/15;
  		if(radius > 25)
  			radius = 25;
  		image.style.borderRadius=radius.toString()+'px';
  	};
  	image.onmouseout=function(){
  		image.style.boxShadow = "initial";
  	};

  	updateStatistics(term);
}

function createBlockingDiv(width, height, term){
	var div = document.createElement("div");

  	var imgurl = chrome.extension.getURL("icon.png");

  	div.style.background='linear-gradient(rgba(0,0,0,.5), rgba(255,255,255,.7))';
  	div.setAttribute("id", "SpoilerAlertBlockingDiv");
  	div.innerHTML = '<img src="' + imgurl +'" >' //alt="Mountain View" style="width:304px;height:228px">'
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
function blockSpoilerPosts(){
	var posts = currentPosts;
	//starts at where the last search ended
	for(var i = previousCurrentPostsSize; i < posts.length; i++){
		var currentPost = posts[i];

		//check to make sure we have not already checked this post
		// var isChecked = currentPost.firstChild.getAttribute('id') === "SpoilerAlertHolderDiv";
		// if(isChecked)
		// 	return;
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
function executeBlocking(){
	if(!AllTermsString || AllTermsString.length <= 3)
		return;
	facebookPosts = getNewsfeedStories();
	if(facebookPosts.length > previousCurrentPostsSize){
		currentPosts = facebookPosts;
		blockSpoilerPosts();
		previousCurrentPostsSize = currentPosts.length;
	}
	//blockFacebookItem(newsfeedStories[0], "testing");
	// blockFacebookItem(newsfeedStories[1], "testing");
}

/**
 * Called when Facebook is first loaded
 */
function initFacebookBlocker(){
	//Gets data from local storage
	chrome.extension.sendMessage({storage: 'AllTerms02021994SpoilerAlert'}, function(response) {
		AllTermsString = response.resp;
	});
	updateSettings();
	setTimeout(executeBlocking, 500);
	executeBlocking();
}

console.log('Executing Spoiler Blocking on facebook.com');
initFacebookBlocker();
document.addEventListener("scroll", executeBlocking);