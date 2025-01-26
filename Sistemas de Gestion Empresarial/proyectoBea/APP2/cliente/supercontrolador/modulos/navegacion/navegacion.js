function listadoTablas(aplicacion){
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

// function listadoDocumentos(){
// 	/////////////////////////////////// LISTADO DE COLECCIONES DE MONGO /////////////////////////////////////////////
    
//     fetch("../../servidor/?o=listacolecciones")                        // LLamo a un microservicio que me da la lista de tablas
//         .then(response => {
//           return response.json();                                   // Quiero que el servidor me devuelva un json
//         })
//         .then(datos => {
//         console.log("Vamos con las colecciones")
//         console.log(datos)
//         		poblarMenuNavegacion(datos,"coleccion");
//         })
    
//     /////////////////////////////////// LISTADO DE COLECCIONES DE MONGO /////////////////////////////////////////////
// }


document.querySelector("#volver").onclick = function() {
  
  window.location = "../escritorio";
};