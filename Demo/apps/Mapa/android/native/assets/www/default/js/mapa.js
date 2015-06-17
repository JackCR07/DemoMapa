
/* JavaScript content from js/mapa.js in folder common */
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
		getCoordenada(1);
		
		
	}
	;

	function onLocationError(error) {
		console.log("Error occured. Code is:" + error.code);
	}
	;

	navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
}

function drawCordenadaSuccess(response){
	var resultado=response.invocationResult.Envelope.Body.getCoordenadaResponse.resultado;
	for(i=0;i<resultado.length;i++){
		var latitud=resultado[i].latitud;
		var longitud=resultado[i].longitud;
		var coords=new google.maps.LatLng(latitude, longitude);
		var marker = new google.maps.Marker({
		      position: coords,
		      map: map
		  });
		marker.setMap(map);
	}
};