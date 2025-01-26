/*
	En este archivo encontramos las siguientes funciones:
	1.-Función de imprimir
	2.-Mostrar el panel de lógica de negocio
	3.-Mostrar la ayuda
	4.-Recargar la web al pulsar en el título
*/

function imprimir(){
	/////IMPRIMIR ///////
	
	document.querySelector("#imprimir").onclick = function(){
		window.print()
	}
}
function muestraBI(){
	//// BUSINESS ANALYTICS ////
	
	document.querySelector("#businessanalytics").onclick = function(){			
		let aplicacion = localStorage.getItem('crimson_aplicacion')	
		       
		document.querySelector("section").innerHTML = ""
		let marco = document.createElement("iframe")
		marco.setAttribute("src", `../bi/?aplicacion=${encodeURIComponent(aplicacion)}`);
		document.querySelector("section").appendChild(marco)
	}
}



