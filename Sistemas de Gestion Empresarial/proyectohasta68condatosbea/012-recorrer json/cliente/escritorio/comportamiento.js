// Se establece una función que se ejecutará cuando la ventana se haya cargado completamente.
window.onload = function() {
    // Realiza una solicitud fetch para obtener la lista de aplicaciones desde el microservicio especificado.
    fetch("../../servidor/lista_aplicaciones.php") // Llama a un microservicio que devuelve la lista de aplicaciones.
        .then(response => {
            return response.json(); // Convierte la respuesta del servidor a un objeto JSON.
        })
        .then(data => {
            // Carga la plantilla HTML que servirá como base para crear las instancias de cada aplicación.
            const plantilla = document.getElementById('plantilla_aplicacion'); // Carga la plantilla HTML como una referencia en memoria.
            console.log(data); // Imprime el JSON recibido en la consola para verificar su contenido.

            // Itera sobre cada uno de los elementos que vienen en el JSON de la base de datos.
            data.forEach(function(elemento) {
                console.log(elemento); // Imprime cada elemento en la consola para depuración.

                // Clona la plantilla HTML para crear una nueva instancia.
                const instancia = plantilla.content.cloneNode(true); // Crea una nueva instancia de la plantilla.

                // Selecciona el elemento <p> dentro de la plantilla clonada.
                const nombre = instancia.querySelector('p'); 
                nombre.innerHTML = elemento.nombre; // Asigna el nombre de la aplicación desde el JSON al contenido del elemento <p>.

                // Selecciona la imagen dentro de la plantilla clonada.
                const imagen = instancia.querySelector("img");
                imagen.setAttribute("src", "img/" + elemento.icono); // Establece la fuente de la imagen usando el icono del JSON.

                // Finalmente, añade la instancia clonada al árbol HTML, dentro del elemento <main>.
                document.querySelector('main').appendChild(instancia); // Inserta la nueva instancia en el DOM.
            });
        });
}
