window.onload = function() {
    // Se ejecuta cuando la ventana se ha cargado completamente.
    fetch("../../servidor/lista_aplicaciones.php") // Llama a un microservicio que proporciona la lista de aplicaciones.
        .then(response => {
            return response.json(); // Convierte la respuesta del servidor en formato JSON.
        })
        .then(data => {
            // Carga el template HTML de la aplicación desde el documento.
            const plantilla = document.getElementById('plantilla_aplicacion'); // Selecciona la plantilla.
            console.log(data); // Muestra los datos recibidos en la consola para depuración.

            // Recorre cada uno de los elementos que vienen en el JSON.
            data.forEach(function(elemento) {
                console.log(elemento); // Muestra cada elemento en la consola para verificar que funciona.

                // Crea una nueva instancia del template.
                const instancia = plantilla.content.cloneNode(true); // Clona el contenido de la plantilla.

                // Selecciona el elemento de texto dentro de la plantilla.
                const nombre = instancia.querySelector('p'); // Busca el primer <p> en la plantilla clonada.
                nombre.innerHTML = elemento.nombre; // Asigna el nombre de la aplicación al contenido del <p>.

                // Selecciona la imagen dentro de la plantilla.
                const imagen = instancia.querySelector("img"); // Busca la imagen en la plantilla clonada.
                imagen.setAttribute("src", "img/" + elemento.icono); // Asigna la ruta de la imagen usando el ícono del elemento.

                // Agrega la instancia de la plantilla al documento.
                document.querySelector('main').appendChild(instancia); // Añade la instancia al árbol HTML en el <main>.
            });
        });
}
