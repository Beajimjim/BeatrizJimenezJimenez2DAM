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
                
                // Creo en memoria un nuevo elemento <li>
                let elemento = document.createElement("li");
                // A ese elemento <li> le pongo como texto el nombre de la tabla
                elemento.textContent = nombre_de_la_tabla;
                // Lo añado al menú
                menu.appendChild(elemento);
            });
        });

    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////

    /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////

    // Llamo a un microservicio que me da la lista de columnas de la tabla
    fetch("../../servidor/columnas_tabla.php")
        .then(response => {  
            return response.json(); // Quiero que el servidor me devuelva un JSON
        })
        .then(datos => {
            // Selecciono donde tengo que poner las cabeceras en la tabla
            let cabeceras_tabla = document.querySelector("table thead tr");
            
            // Para cada uno de los datos de las columnas
            datos.forEach(function(dato) {
                // Creo un elemento que es una cabecera de tabla
                let elemento = document.createElement("th");
                // Su texto es el nombre del campo de la base de datos
                elemento.textContent = dato['Field'];
                // Añado ese elemento a las cabeceras de la tabla
                cabeceras_tabla.appendChild(elemento);
            });
        });

    /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////

    /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////

    // Llamo a un microservicio que me da los datos de la tabla
    fetch("../../servidor/datos_tabla.php")
        .then(response => {           
            return response.json(); // Quiero que el servidor me devuelva un JSON
        })
        .then(datos => {
            // Selecciono el contenido vacío de la tabla
            let contenidotabla = document.querySelector("section table tbody");
            
            // Como datos es un array, hago un forEach para repasarlo
            datos.forEach(function(registro) {
                // Creo una nueva fila como un elemento HTML vacío
                let nuevafila = document.createElement("tr");
                
                // Fórmula para recorrer correctamente las propiedades de un objeto
                Object.keys(registro).forEach(clave => {
                    // Creo una nueva columna HTML
                    let nuevacolumna = document.createElement("td");
                    // Le pongo el contenido en texto
                    nuevacolumna.textContent = registro[clave];
                    // Introduzco la columna dentro de la fila
                    nuevafila.appendChild(nuevacolumna);
                });
                // Introduzco la fila dentro de la tabla
                contenidotabla.appendChild(nuevafila);
            });
        });

    /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////
}
