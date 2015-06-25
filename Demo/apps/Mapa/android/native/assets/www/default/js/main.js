
/* JavaScript content from js/main.js in folder common */
var pagesHistory = [];
var currentPage = {};
var path = "";

function wlCommonInit(){
	WL.Client.connect({
		onSuccess : connectSuccess,
		onFailure : connectFailure
	});
}

function connectSuccess() {
	$("#container").load(path + "pages/MainPage.html", function(){
		$.getScript(path + "js/mainPage.js", function() {
			if (currentPage.init) {
				currentPage.init();
			}
		});
	});
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=onGoogleMapsReady';
	document.body.appendChild(script);
	WL.Logger.debug("Successfully connected to MobileFirst Server.");
}
function onGoogleMapsReady(){
	WL.Logger.debug("onGoogleMapsReady");
}
function connectFailure() {
	WL.Logger.debug("Failed connecting to MobileFirst Server.");
	WL.SimpleDialog.show("Push Notifications",
			"Failed connecting to MobileFirst Server. Try again later.", [ {
				text : 'Reload',
				handler : WL.Client.reloadapp
			}, {
				text : 'Close',
				handler : function() {
				}
			} ]);
}


/* JavaScript content from js/main.js in folder android */
// This method is invoked after loading the main HTML and successful initialization of the Worklight runtime.
function wlEnvInit(){
    wlCommonInit();
    // Environment initialization code goes here
}