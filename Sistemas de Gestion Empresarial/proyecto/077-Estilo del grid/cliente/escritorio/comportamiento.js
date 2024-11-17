// Espera a que la página se cargue completamente antes de ejecutar el código
window.onload = function() {
    
    // Realiza una solicitud al servidor para obtener la lista de aplicaciones
    fetch("../../servidor/?o=tabla&tabla=aplicaciones") // Llamo a un microservicio que devuelve una lista en formato JSON
        .then(response => {
            return response.json(); // Convierte la respuesta del servidor a formato JSON
        })
        .then(data => {
            // Obtiene el template HTML para las aplicaciones (plantilla en memoria)
            const plantilla = document.getElementById('plantilla_aplicacion'); 
            
            // Muestra el JSON obtenido en la consola para depuración
            console.log(data);

            // Itera sobre cada elemento del JSON devuelto por el servidor
            data.forEach(function(elemento) {
                
                // Muestra el elemento actual en la consola para depuración
                console.log(elemento);

                // Crea una nueva instancia de la plantilla (clon del template)
                const instancia = plantilla.content.cloneNode(true);

                // Selecciona el elemento <p> dentro de la plantilla clonada
                const nombre = instancia.querySelector('p');

                // Asigna el nombre de la aplicación obtenido del JSON al contenido del <p>
                nombre.innerHTML = elemento.nombre;

                // Selecciona el elemento con clase "icono" dentro de la instancia clonada
                let icono = instancia.querySelector(".icono");

                // Asigna la primera letra del nombre de la aplicación como texto del icono
                icono.textContent = elemento.nombre[0];

                // Inserta la instancia clonada en el contenedor principal del HTML
                document.querySelector('main').appendChild(instancia);
            });
            
            // Selecciona todas las instancias de aplicaciones creadas y las guarda en una lista
            let aplicaciones = document.querySelectorAll(".aplicacion");

            // Itera sobre cada aplicación de la lista
            aplicaciones.forEach(function(aplicacion) {
                
                // Asigna una función de clic a cada aplicación
                aplicacion.onclick = function() {
                    
                    // Redirige al usuario a la página de supercontrolador
                    window.location = "../supercontrolador/";
                };
            });
        });
};
