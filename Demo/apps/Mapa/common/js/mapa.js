/**
 * 
 */

var map;
function drawMap() {

	document.getElementById('botonCoordenadas').style.display="none";
	document.getElementById('botonMapa').style.display="none";
	//document.getElementById('map').style.display="inline";
	function onLocationSuccess(position) {

		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var coords = new google.maps.LatLng(latitude, longitude);
		var mapOptions = {
			zoom : 100,
			center : coords
		};
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		getCoordenada(2);
		
		
	}
	;

	function onLocationError(error) {
		console.log("Error occured. Code is:" + error.code);
	}
	;

	navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
}

