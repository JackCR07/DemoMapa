function wlCommonInit(){
	WL.Client.connect({
		onSuccess : connectSuccess,
		onFailure : connectFailure
	});
}

function connectSuccess() {
	WL.Logger.debug("Successfully connected to MobileFirst Server.");
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
