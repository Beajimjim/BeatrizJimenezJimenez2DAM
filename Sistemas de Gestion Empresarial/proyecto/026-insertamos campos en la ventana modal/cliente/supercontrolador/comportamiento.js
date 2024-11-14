/////////////////////////////////// VARIABLES GLOBALES DEL PROGRAMA /////////////////////////////////////////////

var columnas_tabla = []                                             // Creo una variable global para almacenar las columnas

/////////////////////////////////// VARIABLES GLOBALES DEL PROGRAMA /////////////////////////////////////////////


window.onload = function() {
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    // Hago una petición para obtener la lista de tablas desde el servidor
    fetch("../../servidor/lista_tablas.php")
        .then(response => {
            return response.json();  // Espero que el servidor devuelva un JSON
        })
        .then(datos => {
            let menu = document.querySelector("nav ul"); // Selecciono el menú donde se agregarán las tablas
            datos.forEach(function(tabla) { // Para cada tabla recibida
                let nombre_de_la_tabla = tabla['Tables_in_sistemagestionempresa']; // Obtengo el nombre de la tabla
                let elemento = document.createElement("li"); // Creo un nuevo elemento de lista
                elemento.textContent = nombre_de_la_tabla; // Asigno el nombre de la tabla al texto del elemento
                elemento.onclick = function() { // Agrego un manejador de eventos al hacer clic en el elemento
                    let texto = this.textContent; // Capturo el texto del elemento clicado
                    console.log("a por la tabla", texto); // Imprimo en consola el nombre de la tabla
                    cargaDatosTabla(texto); // Llamo a la función para cargar datos de la tabla seleccionada
                };
                menu.appendChild(elemento); // Agrego el elemento de lista al menú
            });
        });

    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    cargaDatosTabla("clientes"); // Cargamos los datos de la tabla "clientes" por defecto al iniciar

     /////////////////////////////////// CLICK VENTANA MODAL PARA INSERTAR /////////////////////////////////////////////
    document.querySelector("#insertar").onclick = function(){
        document.querySelector("#modal").style.display = "block"
    }
    document.querySelector("#modal").onclick = function(){
        document.querySelector("#modal").style.display = "none"
    }
    document.querySelector("#contienemodal").onclick = function(event){
        event.stopPropagation()
    }

}


/////////////////////////////////// CREO UNA FUNCIÓN PARA CARGAR DINÁMICAMENTE TABLAS /////////////////////////////////////////////
function cargaDatosTabla(tabla) {
    let campoclave; // Variable para almacenar el nombre del campo que es clave primaria

    /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
     
    // Hago una petición para obtener la lista de columnas de la tabla seleccionada
    fetch("../../servidor/columnas_tabla.php?tabla=" + tabla)
        .then(response => {
            return response.json(); // Espero que el servidor devuelva un JSON
        })
        .then(datos => {
            columnas_tabla = []                                             // Vacía las columnas anteriores para cargar solo las nuevas
            let cabeceras_tabla = document.querySelector("table thead tr"); // Selecciono la fila de cabeceras en la tabla
            cabeceras_tabla.innerHTML = ""; // Vacío la cabecera para evitar duplicados
            
            // Itero sobre cada columna recibida
            datos.forEach(function(dato) {
                let elemento = document.createElement("th"); // Creo un nuevo encabezado
                columnas_tabla.push(dato['Field'])    
                elemento.textContent = dato['Field']; // Asigno el nombre del campo a la cabecera
                cabeceras_tabla.appendChild(elemento); // Agrego el encabezado a la tabla
                if (dato['Key'] == "PRI") { // Si el campo es clave primaria
                    campoclave = dato['Field']; // Guardamos el nombre del campo clave
                }
            });

            let elemento = document.createElement("th"); // Creo un encabezado adicional
            cabeceras_tabla.appendChild(elemento); // Agrego el encabezado adicional a la tabla
            console.log(columnas_tabla);

            /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
                    
            let contiene_modal = document.querySelector("#contienemodal")                           // Selecciono el contenedor del modal
            contiene_modal.innerHTML = ""                                                           // Si el modal contenía algo, lo vaćio
            columnas_tabla.forEach(function(columna){                                               // PAra cada una de las columnas de la tabla
                contiene_modal.innerHTML += columna+"<br>"                                          // Pongo el nombre de la columna como un texto
            })
            
            /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////



            /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////

  
            // Hago una petición para obtener los datos de la tabla seleccionada
            fetch("../../servidor/datos_tabla.php?tabla=" + tabla)
                .then(response => {
                    return response.json(); // Espero que el servidor devuelva un JSON
                })
                .then(datos => {
                    let contenidotabla = document.querySelector("section table tbody"); // Selecciono el cuerpo de la tabla
                    contenidotabla.innerHTML = ""; // Vacío el contenido de la tabla antes de llenarlo
                    
                    // Itero sobre cada registro recibido
                    datos.forEach(function(registro) {
                        let clave_primaria; // Variable para almacenar la clave primaria del registro
                        let nuevafila = document.createElement("tr"); // Creo una nueva fila para el registro
                        
                        Object.keys(registro).forEach(clave => { // Itero sobre cada clave del registro
                            if (clave == campoclave) { // Si la clave es la clave primaria
                                clave_primaria = registro[clave]; // Guardamos el valor de la clave primaria
                            }
                            let nuevacolumna = document.createElement("td"); // Creo una nueva columna
                            nuevacolumna.textContent = registro[clave]; // Asigno el contenido de la columna
                            nuevafila.appendChild(nuevacolumna); // Agrego la columna a la fila
                        });
                        
                        let nuevacolumna = document.createElement("td"); // Creo una columna para eliminar
                        nuevacolumna.textContent = "🗑️"; // Asigno el emoji de la papelera
                        nuevacolumna.setAttribute("claveprimaria", clave_primaria); // Agrego el atributo de clave primaria
                        nuevafila.appendChild(nuevacolumna); // Agrego la columna de eliminar a la fila
                        
                        // Agrego un evento de clic a la columna de eliminar
                        nuevacolumna.onclick = function() {
                            console.log("Vamos a eliminar algo"); // Mensaje de depuración
                            let identificador = this.getAttribute("claveprimaria"); // Obtengo el identificador del registro
                            // Hago una petición para eliminar el registro
                            fetch("../../servidor/eliminar_dato.php?tabla=" + tabla + "&id=" + identificador);
                            this.parentElement.remove(); // Elimino visualmente la fila de la tabla
                        }
                        
                        contenidotabla.appendChild(nuevafila); // Agrego la fila al contenido de la tabla
                    });
                });
            
            /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////
        });
}

