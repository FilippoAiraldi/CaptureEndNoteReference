function runOriginalCaptureReferenceScript() {
	var obj = document.getElementsByTagName("head")[0];
	var scripts = obj.getElementsByTagName("SCRIPT");
	var flag = 0;

	for(i = 0; i < scripts.length; ++i) {
		if(scripts[i].src.match(/bookmarklet.js/)) { // to be modified
			flag = 1;
			break;
		}
	}

	if(this.disabled == undefined && flag == 0) {
		this.disabled = true;
		try{
			var x = document.createElement('SCRIPT');
			x.type = 'text/javascript';
			x.src = browser.runtime.getURL('scripts/popup.js')
			document.getElementsByTagName('head')[0].appendChild(x);
		} catch(e) {
			console.log(e);
		};
	}

	this.disabled = undefined;
	void(0)
}


chrome.runtime.onMessage.addListener(
	function(message, sender, sendResponse) {
		if (message.id === "capture-reference-browseraction") {
			runOriginalCaptureReferenceScript()
		}
	}
);

