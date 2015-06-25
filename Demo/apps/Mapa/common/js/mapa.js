/**
 * 
 */

var map;

$(document).ready(function(){
	drawMap();
});
function drawMap() {

	function onLocationSuccess(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var coords = new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
			zoom : 10,
			center : coords
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		getCoordenada(2);
		
		
	};

	function onLocationError(error) {
		console.log("Error occured. Code is:" + error.code);
	}
	;
	var options={ maximumAge: 3000, timeout: 100000, enableHighAccuracy: true };
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError, options);
		
	}
	else
		console.log("error");
}

