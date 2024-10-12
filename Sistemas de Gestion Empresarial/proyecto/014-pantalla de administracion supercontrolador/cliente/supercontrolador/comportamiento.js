window.onload = function() { // Se ejecuta cuando la ventana se ha cargado completamente.
    // Llama a un microservicio que devuelve la lista de aplicaciones.
    fetch("../../servidor/lista_aplicaciones.php")         
        .then(response => {
            return response.json(); // Convierte la respuesta del servidor a formato JSON.
        })
        .then(data => {
            // Carga el template HTML de las aplicaciones.
            const plantilla = document.getElementById('plantilla_aplicacion');              
            console.log(data); // Imprime el JSON en la consola para verificar el contenido.

            // Itera sobre cada elemento recibido del JSON.
            data.forEach(function(elemento) {                                              
                console.log(elemento); // Muestra cada elemento en la consola para comprobar que se recibe correctamente.

                // Clona la plantilla HTML para crear una nueva instancia.
                const instancia = plantilla.content.cloneNode(true);                        
                
                // Selecciona el elemento <p> dentro de la plantilla.
                const nombre = instancia.querySelector('p');                                
                nombre.innerHTML = elemento.nombre; // Establece el nombre de la aplicación en el <p>.

                // Selecciona el elemento <img> dentro de la plantilla.
                const imagen = instancia.querySelector("img");
                imagen.setAttribute("src", "img/" + elemento.icono); // Establece la fuente de la imagen usando el ícono del JSON.

                // Agrega la nueva instancia al árbol HTML dentro del elemento <main>.
                document.querySelector('main').appendChild(instancia);                      
            });
        });
}
