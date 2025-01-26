var columnas_tabla = []                                          
window.onload = function(){
	 let aplicacion = localStorage.getItem("crimson_aplicacion")
    
    listadoTablas(aplicacion); 
    cargaGraficas();       		
    modal()     
    cargoAplicaciones()
    imprimir();
    muestraBI()
   
}


 
 
 
 
