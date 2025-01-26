window.onload = function() {
    // Llamar al servidor para obtener la lista de aplicaciones desde la base de datos
    let usuario = localStorage.getItem("crimson_usuario");
    console.log(usuario);
    if (usuario == undefined) {
        window.location = "../";
    } 

    let token = localStorage.getItem("crimson_token");
    if (token == undefined) {
        window.location = "../";
    }

    let nombre = localStorage.getItem("crimson_nombre");
    console.log(nombre);
    if (nombre == undefined) {
        window.location = "../";
    } else {
        // Mostrar el nombre del usuario en el HTML
        const nombreSpan = document.getElementById("nombre");
        nombreSpan.textContent = nombre;
    }


    fetch("../../servidor/?o=compruebatoken&token=" + token) 
    .then(response => {
          return response.json();                       // Quiero que el servidor me devuelva un json
        })
        .then(data => {
            console.log(data);
            if (data.resultado == "ok") {
                // Token válido, continuar con la ejecución
            } else {
                window.location = "../";
            }
        });

    fetch("../../servidor/?o=listadoaplicacionesusuario&usuario=" + usuario)
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
                    localStorage.setItem('crimson_aplicacion', this.querySelector("p").textContent);
                    window.location = "../supercontrolador/";
                };
            });
        });

    document.querySelector("#cerrarsesion").onclick = function() {
        localStorage.removeItem("crimson_usuario");
        localStorage.removeItem("crimson_token");
        window.location = "../";
    };
};
