// Función principal que se ejecuta cuando la página se carga completamente
window.onload = function() {
    
    // Llamada al microservicio para obtener la lista de aplicaciones desde el servidor
    fetch("../../servidor/?o=tabla&tabla=aplicaciones")
        .then(response => {
            return response.json(); // Convertir la respuesta del servidor a formato JSON
        })
        .then(data => {
            // Seleccionar la plantilla HTML (elemento <template>) que será utilizada para crear cada aplicación
            const plantilla = document.getElementById('plantilla_aplicacion');
            console.log(data); // Mostrar los datos obtenidos del servidor en la consola para depuración
            
            // Iterar sobre cada elemento en el array de datos (JSON) recibido del servidor
            data.forEach(function(elemento) {
                console.log(elemento); // Mostrar cada elemento individual del JSON en la consola

                // Crear una nueva instancia de la plantilla clonándola (sin afectar el original)
                const instancia = plantilla.content.cloneNode(true);
                
                // Seleccionar el elemento `<p>` dentro de la plantilla clonada
                const nombre = instancia.querySelector('p');
                
                // Insertar el nombre de la aplicación obtenido del JSON dentro del elemento `<p>`
                nombre.innerHTML = elemento.nombre;

                // Seleccionar el elemento con la clase `.icono` dentro de la plantilla clonada
                let icono = instancia.querySelector(".icono");
                
                // Asignar el primer carácter del nombre de la aplicación al elemento `.icono` (para mostrarlo como ícono)
                icono.textContent = elemento.nombre[0];
                
                // Insertar la instancia clonada de la plantilla en el árbol DOM dentro de la etiqueta `<main>`
                document.querySelector('main').appendChild(instancia);
            });

            // Seleccionar todas las aplicaciones renderizadas en el DOM (clase `.aplicacion`)
            let aplicaciones = document.querySelectorAll(".aplicacion");
            
            // Agregar un evento `onclick` a cada aplicación para manejar la navegación
            aplicaciones.forEach(function(aplicacion) {
                aplicacion.onclick = function() {
                    // Redirigir al usuario a una nueva página (en este caso, `../supercontrolador/`)
                    window.location = "../supercontrolador/";
                };
            });
        });
};
