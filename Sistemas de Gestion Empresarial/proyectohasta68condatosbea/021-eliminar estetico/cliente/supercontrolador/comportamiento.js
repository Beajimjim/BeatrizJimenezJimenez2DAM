window.onload = function() {
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    // Llamo a un microservicio que me da la lista de tablas
    fetch("../../servidor/lista_tablas.php")
        .then(response => {
            return response.json(); // Quiero que el servidor me devuelva un JSON
        })
        .then(datos => {
            // Selecciono el menú donde voy a poner las entradas dinámicas
            let menu = document.querySelector("nav ul");

            // Para cada una de las tablas que han venido de la base de datos
            datos.forEach(function(tabla) {
                // Atrapo el nombre de la tabla que viene del fetch
                let nombre_de_la_tabla = tabla['Tables_in_sistemagestionempresa'];
                
                // Creo en memoria un nuevo elemento li
                let elemento = document.createElement("li");
                elemento.textContent = nombre_de_la_tabla; // Añado el nombre de la tabla al elemento li
                
                // Cuando hago click en los elementos de la tabla
                elemento.onclick = function() {
                    let texto = this.textContent; // Atrapo el texto del elemento de navegación
                    console.log("a por la tabla", texto); // Imprimo en consola
                    cargaDatosTabla(texto); // Llamo a la función para cargar los datos de la tabla
                };
                
                // Lo añado al menú
                menu.appendChild(elemento);
            });
        });
    
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    // Cuando arranca el programa, le pongo una tabla por defecto
    cargaDatosTabla("clientes");
}

/////////////////////////////////// CREO UNA FUNCIÓN PARA CARGAR DINÁMICAMENTE TABLAS /////////////////////////////////////////////
function cargaDatosTabla(tabla) {
    let campoclave; // Creo una variable para almacenar el nombre del campo clave primaria
    
    /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
    
    // Llamo a un microservicio que me da la lista de columnas de la tabla especificada
    fetch("../../servidor/columnas_tabla.php?tabla=" + tabla)
        .then(response => {
            return response.json(); // Quiero que el servidor me devuelva un JSON
        })
        .then(datos => {
            console.log(datos); // Imprimo los datos en consola
            
            // Selecciono donde tengo que poner las cabeceras en la tabla
            let cabeceras_tabla = document.querySelector("table thead tr");
            cabeceras_tabla.innerHTML = ""; // Vacío la cabecera por si había columnas previamente cargadas
            
            // Para cada uno de los datos de la tabla
            datos.forEach(function(dato) {
                // Creo un elemento que es una cabecera de tabla
                let elemento = document.createElement("th");
                elemento.textContent = dato['Field']; // Su texto es el nombre del campo de la base de datos
                
                // Añado ese elemento a las cabeceras de la tabla
                cabeceras_tabla.appendChild(elemento);
                
                // Si este campo es clave primaria
                if (dato['Key'] == "PRI") {
                    // Recordamos el nombre del campo que hace de clave primaria
                    campoclave = dato['Field'];
                }
            });

            // Agrego una columna vacía adicional a la cabecera
            let elemento = document.createElement("th");
            cabeceras_tabla.appendChild(elemento); 
            
            /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////
  
            // Llamo a un microservicio que me da los datos de la tabla especificada
            fetch("../../servidor/datos_tabla.php?tabla=" + tabla)
                .then(response => {
                    return response.json(); // Quiero que el servidor me devuelva un JSON
                })
                .then(datos => {
                    // Selecciono el contenido vacío de la tabla
                    let contenidotabla = document.querySelector("section table tbody");
                    contenidotabla.innerHTML = ""; // Vacío la tabla por si había algo
                    
                    // Recorro los registros de datos
                    datos.forEach(function(registro) {
                        let clave_primaria; // Variable para almacenar la clave primaria
                        // Creo una nueva fila como un elemento HTML vacío
                        let nuevafila = document.createElement("tr");
                        
                        // Recorro las propiedades de un objeto
                        Object.keys(registro).forEach(clave => {
                            // Si este campo es la clave primaria
                            if (clave == campoclave) {
                                clave_primaria = registro[clave]; // Guarda el número de la clave primaria como identificador de registro
                            }
                            
                            // Creo una nueva columna HTML
                            let nuevacolumna = document.createElement("td");
                            nuevacolumna.textContent = registro[clave]; // Le pongo el contenido en texto
                            nuevafila.appendChild(nuevacolumna); // Introduzco la columna dentro de la fila
                        });
                        
                        // Creo una nueva columna para la acción de eliminar
                        let nuevacolumna = document.createElement("td");
                        nuevacolumna.textContent = "🗑️"; // Le doy el emoji de la papelera
                        nuevacolumna.setAttribute("claveprimaria", clave_primaria); // Le pongo un atributo que se llama claveprimaria
                        nuevafila.appendChild(nuevacolumna); // Lo pongo en las columnas
                        
                        // Cuando haga clic en la papelera
                        nuevacolumna.onclick = function() {
                            console.log("Vamos a eliminar algo"); // Imprimo en consola la acción de eliminar
                        }
                        
                        // Introduzco la fila dentro de la tabla
                        contenidotabla.appendChild(nuevafila);
                    });
                });
            /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////
        });
}

/////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
