function listadoTablas(aplicacion){
  //console.log("soy funcion listadoTablas");
  
	/////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    fetch("../../servidor/?o=listatablasaplicacion&aplicacion="+aplicacion)                        // LLamo a un microservicio que me da la lista de tablas
        .then(response => {
          return response.json();                                   // Quiero que el servidor me devuelva un json
        })
        .then(datos => {
        //console.log(datos)
        		poblarMenuNavegacion(datos,"tabla");
            cargaDatosTabla(datos[0].Tabla_de_Aplicación); //carga la primera tabla de la aplicacion en la que entramos
            
        })
    
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
}


document.querySelector("#volver").onclick = function() {
  
  window.location = "../escritorio";
};