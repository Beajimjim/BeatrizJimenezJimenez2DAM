window.onload = function() {
    // Cuando la ventana se carga, se hace una llamada a un microservicio que devuelve la lista de tablas.
    fetch("../../servidor/lista_tablas.php")
        .then(response => {
            // Espero recibir una respuesta en formato JSON del servidor.
            return response.json();
        })
        .then(datos => {
            // Selecciono el menú donde se agregarán las entradas dinámicas.
            let menu = document.querySelector("nav ul");
            
            // Itero sobre cada una de las tablas recibidas desde la base de datos.
            datos.forEach(function(tabla) {
                // Obtengo el nombre de la tabla desde el objeto recibido.
                let nombre_de_la_tabla = tabla['Tables_in_sistemagestionempresa'];
                
                // Creo un nuevo elemento <li> en memoria para la tabla.
                let elemento = document.createElement("li");
                
                // Asigno el nombre de la tabla como texto del elemento <li>.
                elemento.textContent = nombre_de_la_tabla;
                
                // Agrego el elemento <li> al menú existente en la página.
                menu.appendChild(elemento);
            });
        });
}
