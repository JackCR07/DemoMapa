
/* JavaScript content from js/coordenadas.js in folder common */
/**
 * 
 */

currentPage={};

currentPage.init = function() {
	WL.Logger.debug("init.. Page1...");
};

$(document).ready(function(){
	getCoordenada(1);
});
function getCoordenada(indicador) {
	var coordenada = {
		"getCoordenada" : {
			"usuario" : "someValue"
		}
	};
	var headers = {
		"SOAPAction" : "getCoordenada"
	}
	var invocationData = {
		adapter : "SoapAdapter1",
		procedure : "CoordManageHttpService_getCoordenada",
		parameters : [ coordenada, headers ]
	};

	var options = {
		onSuccess : (indicador == 1) ? getCordenadaSuccess
				: drawCordenadaSuccess,
		onFailure : getCordenadaFailure
	};

	WL.Client.invokeProcedure(invocationData, options);
}

/*function listCoord() {

	document.getElementById('Main').style.visibility = "hidden";
	document.getElementById('coordinadas').style.visibility = "visible";

	getCoordenada(1);

}
*/
function getCordenadaSuccess(response) {
	var table = document.getElementById("tablaCoordenadas");
	var resultado = response.invocationResult.Envelope.Body.getCoordenadaResponse.resultado;
	console.log(resultado instanceof Array)
	if (resultado instanceof Array) {
		for (i = 0; i < resultado.length; i++) {
			var fila = table.insertRow(0);
			var latitud = fila.insertCell(0);
			var longitud = fila.insertCell(1);
			var descripcion = fila.insertCell(2);
			latitud.innerHTML = resultado[i].latitud;
			longitud.innerHTML = resultado[i].longitud;
			descripcion.innerHTML = resultado[i].descripcion;
		}
	}
	else
		{
		var fila = table.insertRow(0);
		var latitud = fila.insertCell(0);
		var longitud = fila.insertCell(1);
		var descripcion = fila.insertCell(2);
		latitud.innerHTML = resultado.latitud;
		longitud.innerHTML = resultado.longitud;
		descripcion.innerHTML = resultado.descripcion;
		}
	var fila = table.insertRow(0);
	var latitud = fila.insertCell(0);
	var longitud = fila.insertCell(1);
	var descripcion = fila.insertCell(2);
	latitud.innerHTML = "latitud";
	longitud.innerHTML = "longitud";
	descripcion.innerHTML ="descripcion";

};

function drawCordenadaSuccess(response) {
	var resultado = response.invocationResult.Envelope.Body.getCoordenadaResponse.resultado;
	console.log(resultado)
	if(resultado instanceof Array)
		{
		for (i = 0; i < resultado.length; i++) {
			var latitud = resultado[i].latitud;
			var longitud = resultado[i].longitud;
			var coords = new google.maps.LatLng(latitud, longitud);
			var marker = new google.maps.Marker({
				position : coords,
				map : map
			});
			marker.setMap(map);
		}		
		}
	else
		{
		var latitud = resultado.latitud;
		var longitud = resultado.longitud;
		var coords = new google.maps.LatLng(latitud, longitud);
		var marker = new google.maps.Marker({
			position : coords,
			map : map
		});
		marker.setMap(map);
		}
	
};

function getCordenadaFailure(response) {
	console.log(response);
};


function addCoord() {

	function onLocationSuccess(position) {
		var descripcion = "";
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		var geocoder = new google.maps.Geocoder();
		var coords = new google.maps.LatLng(latitude, longitude);
		geocoder.geocode({
			'latLng' : coords
		},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {
						if (results[1]) {
							descripcion = results[1].formatted_address;
							console.log(latitude + " " + longitude + " "
									+ descripcion);
							var table = document.getElementById("tablaCoordenadas");
							var fila = table.insertRow(1);
							var latitud = fila.insertCell(0);
							var longitud = fila.insertCell(1);
							var descripcionCell = fila.insertCell(2);
							latitud.innerHTML = latitude;
							longitud.innerHTML = longitude;
							descripcionCell.innerHTML = descripcion;
							saveCoord(latitude, longitude, descripcion);
						}
					}
				});
		
	}
	;

	function onLocationError(error) {
		console.log("Error occured. Code is:" + error.code);
	}
	;
	
	function saveCoord(latitude,longitude,descripcion){
		var coordenada = {
				"saveCoordenada" : {
					"coordenada" : {
						"descripcion" : descripcion,
						"latitud" : latitude,
						"longitud" : longitude
					}
				}
			};
			var headers = {
				"SOAPAction" : "saveCoordenada"
			}
			var invocationData = {
				adapter : "SoapAdapter1",
				procedure : "CoordManageHttpService_saveCoordenada",
				parameters : [ coordenada, headers ]
			};

			var options = {
				onSuccess : saveCordenadaSuccess,
				onFailure : saveCordenadaFailure
			};

			WL.Client.invokeProcedure(invocationData, options);
	};
	
	function saveCordenadaSuccess(response) {
		console.log(response.status);
		
	}
	;

	function saveCordenadaFailure(response) {
		console.log(response);
	}
	;
	var options={ maximumAge: 3000, timeout: 100000, enableHighAccuracy: true };
	navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError,options);
}

currentPage.back=function(){
	WL.Logger.debug("Page1 :: back");
	$("#container").load(pagesHistory.pop());
}
