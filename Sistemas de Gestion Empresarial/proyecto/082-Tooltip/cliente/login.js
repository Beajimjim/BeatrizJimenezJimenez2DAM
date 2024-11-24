// Se ejecuta cuando se ha cargado completamente la página web
window.onload = function() {
    console.log("Javascript cargado"); // Mensaje en la consola para confirmar que el script se ha cargado

    // Asigna una función al evento 'onclick' del botón con id "login"
    document.querySelector("#login").onclick = function() {
        login(); // Llama a la función 'login' cuando se hace clic en el botón
    };

    // Detecta cuando se presiona una tecla en el teclado
    document.onkeypress = function(e) {
        console.log("Has pulsado una tecla"); // Mensaje en la consola para registrar el evento
        if (e.code == "Enter") { // Comprueba si la tecla presionada es "Enter"
            console.log("Y la tecla es enter"); // Mensaje para confirmar que es la tecla Enter
            login(); // Llama a la función 'login' si se pulsa Enter
        }
    };
};

// Función para gestionar el proceso de inicio de sesión
function login() {
    console.log("Has pulsado el botón"); // Mensaje para confirmar que se ha activado la función

    // Obtiene los valores introducidos en los campos de usuario y contraseña
    let usuario = document.querySelector("#usuario").value;
    let contrasena = document.querySelector("#contrasena").value;
    console.log(usuario, contrasena); // Muestra los valores en la consola para debug

    // Crea un objeto con los datos del usuario y la contraseña
    let mensaje = { "usuario": usuario, "contrasena": contrasena };

    // Realiza una solicitud POST al servidor enviando los datos en formato JSON
    fetch("../servidor/?o=buscar&tabla=usuarios", {
        method: 'POST', // Método HTTP utilizado
        headers: {
            'Content-Type': 'application/json', // Especifica que los datos se enviarán como JSON
        },
        body: JSON.stringify(mensaje), // Convierte el objeto 'mensaje' a formato JSON
    })
    .then(response => {
        return response.json(); // Espera una respuesta en formato JSON del servidor
    })
    .then(data => {
        console.log(data); // Muestra los datos devueltos por el servidor en la consola

        // Verifica si la respuesta contiene datos (el usuario existe y la autenticación fue correcta)
        if (data.length > 0) {
            console.log("Entras correctamente"); // Mensaje de éxito en la consola
            localStorage.setItem('crimson_usuario', data[0].usuario); // Almacena el nombre del usuario en el almacenamiento local

            // Actualiza el mensaje de feedback en la página con estilo de éxito
            document.querySelector("#feedback").style.color = "green";
            document.querySelector("#feedback").innerHTML = "Acceso correcto. Redirigiendo en 5 segundos...";

            // Redirige al usuario al escritorio después de 5 segundos
            setTimeout(function() {
                window.location = "escritorio/index.html";
            }, 5000);
        } else {
            console.log("Error al entrar"); // Mensaje de error en la consola

            // Actualiza el mensaje de feedback en la página con estilo de error
            document.querySelector("#feedback").style.color = "red";
            document.querySelector("#feedback").innerHTML = "Usuario incorrecto. Redirigiendo en 5 segundos...";

            // Recarga la página actual después de 5 segundos
            setTimeout(function() {
                window.location = window.location;
            }, 5000);
        }
    });
}

// Explicación de los comentarios:
// Eventos del DOM:

// window.onload: Inicializa el código cuando se carga la página.
// document.onkeypress: Detecta las teclas presionadas.
// Proceso de autenticación:

// fetch: Envía los datos del usuario al servidor utilizando una solicitud POST.
// then: Procesa la respuesta del servidor en formato JSON.
// Manejo de respuestas:

// Verifica si el usuario es válido basándose en los datos devueltos.
// Proporciona retroalimentación visual al usuario (mensajes de éxito o error).
// Redirige al usuario o recarga la página según el resultado.



// Resumen del flujo
// Cargar la página:
// Asigna las acciones al botón "Login" y a la tecla Enter.
// El usuario interactúa:
// Escribe su nombre de usuario y contraseña, y hace clic en el botón o presiona Enter.
// Enviar datos al servidor:
// El servidor recibe la información, la valida y devuelve un resultado.
// Actuar según la respuesta:
// Si los datos son correctos: Mensaje de éxito y redirección.
// Si son incorrectos: Mensaje de error y recarga.