window.onload = function() {
    // Llamar al servidor para obtener la lista de aplicaciones desde la base de datos
    fetch("../../servidor/?o=tabla&tabla=aplicaciones")
        .then(response => {
            return response.json(); // Convertir la respuesta del servidor en formato JSON
        })
        .then(data => {
            // Seleccionar el template HTML para las aplicaciones
            const plantilla = document.getElementById('plantilla_aplicacion');

            console.log(data); // Mostrar el JSON completo en la consola para depuración

            // Iterar sobre cada elemento recibido en el JSON
            data.forEach(function(elemento) {
                console.log(elemento); // Mostrar cada elemento individual en la consola

                // Crear una nueva instancia del template (clonarlo para cada aplicación)
                const instancia = plantilla.content.cloneNode(true);

                // Seleccionar un elemento específico dentro de la instancia (el párrafo <p>)
                const nombre = instancia.querySelector('p');

                // Asignar el nombre de la aplicación desde el JSON al contenido del párrafo
                nombre.innerHTML = elemento.nombre;

                // Seleccionar el elemento con la clase "icono" dentro de la instancia
                let icono = instancia.querySelector(".icono");

                // Establecer el contenido del icono como la primera letra del nombre de la aplicación
                icono.textContent = elemento.nombre[0];

                // Añadir la instancia al DOM dentro del elemento <main>
                document.querySelector('main').appendChild(instancia);
            });

            // Seleccionar todas las aplicaciones generadas dinámicamente
            let aplicaciones = document.querySelectorAll(".aplicacion");

            // Añadir un evento "onclick" a cada aplicación
            aplicaciones.forEach(function(aplicacion) {
                aplicacion.onclick = function() {
                    // Redirigir al usuario a una URL específica al hacer clic
                    window.location = "../supercontrolador/";
                };
            });
        });
};


// Explicación detallada
// Carga inicial (window.onload):

// Se ejecuta cuando la página se ha cargado completamente.
// Llamada al servidor (fetch):

// Solicita datos de una tabla llamada aplicaciones desde un microservicio.
// La respuesta se convierte en formato JSON.
// Plantilla HTML (template):

// Se utiliza un elemento <template> en el HTML como base para generar dinámicamente el contenido de las aplicaciones.
// Iteración sobre datos (data.forEach):

// Para cada elemento recibido en el JSON:
// Se clona el template.
// Se actualizan los campos del template con datos específicos del JSON (como el nombre de la aplicación).
// Se establece un ícono basado en la primera letra del nombre.
// Finalmente, el clon se inserta en el elemento <main> del DOM.
// Agregar eventos (onclick):

// Se seleccionan todos los elementos generados con la clase .aplicacion.
// Cada elemento recibe un evento onclick que redirige al usuario a una URL específica.
// Propósito de los logs (console.log):

// Ayudar en la depuración mostrando el JSON completo y los elementos individuales en la consola.
// Resultado final
// El código:

// Genera dinámicamente una lista de aplicaciones desde datos obtenidos del servidor.
// Cada aplicación tiene un diseño basado en un template HTML.
// Al hacer clic en una aplicación, redirige al usuario a otra página.
// Esto proporciona una interfaz dinámica y escalable para manejar aplicaciones desde una base de datos.