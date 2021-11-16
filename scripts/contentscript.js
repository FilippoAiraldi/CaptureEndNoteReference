function runOriginalCaptureReferenceScript() {
	var obj = document.getElementsByTagName("head")[0];
	var scripts = obj.getElementsByTagName("SCRIPT");
	var flag = 0;
	var ENW_HOST = "";
	var httpPort = ':80';
	var httpsPort = ':443';
	var protocol = location.protocol;

	if( protocol.match(/https:/) && (navigator.userAgent.indexOf("Trident/7.0") > 0 || navigator.userAgent.indexOf("Trident/8.0") > 0 || navigator.userAgent.indexOf("Edge/") > 0)) {
		ENW_HOST = 'http://www.myendnoteweb.com' + httpPort;
	} else {
		var port = protocol.match(/https:/) ? httpsPort : httpPort; 
		ENW_HOST = protocol + '//www.myendnoteweb.com' + port;		
	}

	for(i = 0; i < scripts.length; ++i) {
		if(scripts[i].src.match(/bookmarklet.js/)) {
			flag = 1;
			break;
		}
	}

	if(this.disabled == undefined && flag == 0) {
		this.disabled = true;
		try{
			var x = document.createElement('SCRIPT');
			x.type = 'text/javascript';
			x.src = ENW_HOST + '/Download/public/bookmarklet.js?' + (new Date().getTime() / 100000);
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

