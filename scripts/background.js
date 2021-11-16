"use strict";

var opts = {
	id: "capture-reference-browseraction"
}


async function requestCapture(tab) {
	chrome.tabs.sendMessage(tab.id, opts);
}


chrome.browserAction.onClicked.addListener(requestCapture);
