// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * changes page to the main webpage that shows all of the statistics for spoiler alert
 */
$(document).ready(function(){
  console.log("in popup.js...");

  $("#myform").focus();
});

document.addEventListener('DOMContentLoaded', function(){
	var mybutt = document.getElementById('alogo');
  	// console.log(mybutt);
  	mybutt.addEventListener('click', function(){
  		console.log("inside listner...");
  		var spoilerAlertURL = chrome.extension.getURL("web/index.html");
  		chrome.tabs.create({url: spoilerAlertURL});
	});
})

function goToSpoilerAlert(){
	console.log('inside listener script');
	var spoilerAlertURL = "web/index.html";
	chrome.tabs.create({url: spoilerAlertURL});
}
