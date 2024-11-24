window.onload = function() { // Función que se ejecuta cuando la ventana se ha cargado completamente.
    // Se realiza una petición fetch al microservicio que devuelve la lista de aplicaciones.
    fetch("../../servidor/?o=tabla&tabla=aplicaciones")      
        .then(response => {
            return response.json(); // Se espera que el servidor devuelva un JSON como respuesta.
        })
        .then(data => {
            // Se carga el template HTML como una plantilla en memoria.
            const plantilla = document.getElementById('plantilla_aplicacion');              
            console.log(data); // Se muestra el JSON en consola para depuración.

            // Se itera sobre cada elemento que viene en el JSON.
            data.forEach(function(elemento) {                                              
                console.log(elemento); // Se muestra cada elemento en consola para comprobar su contenido.

                // Se crea una nueva instancia de la plantilla.
                const instancia = plantilla.content.cloneNode(true);                        
                
                // Se selecciona el párrafo dentro de la plantilla para modificar su contenido.
                const nombre = instancia.querySelector('p');                                
                nombre.innerHTML = elemento.nombre; // Se establece el nombre de la aplicación desde el JSON.
                
                // Se selecciona la imagen dentro de la plantilla.
                const imagen = instancia.querySelector("img");
                imagen.setAttribute("src", "img/" + elemento.icono); // Se establece la ruta de la imagen desde el JSON.

                // Se añade la instancia al árbol HTML en el elemento <main>.
                document.querySelector('main').appendChild(instancia);                      
            });
            
            // Selecciono todas las aplicaciones que tienen la clase "aplicacion" y las guardo en un array.
            let aplicaciones = document.querySelectorAll(".aplicacion");                     
            
            // Se itera sobre cada aplicación seleccionada.
            aplicaciones.forEach(function(aplicacion) {                                     
                // Se asigna una función al evento de clic para cada aplicación.
                aplicacion.onclick = function() {                                            
                    window.location = "../supercontrolador/"; // Redirige a la página del supercontrolador al hacer clic.
                }
            });
        });
}
