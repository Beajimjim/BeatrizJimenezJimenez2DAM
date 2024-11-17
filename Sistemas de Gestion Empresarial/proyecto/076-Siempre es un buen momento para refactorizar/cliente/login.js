// Función para manejar el proceso de login
function login() {
    console.log("Has pulsado el botón de login");

    // Obtiene los valores ingresados para el usuario y la contraseña
    let usuario = document.querySelector("#usuario").value;
    let contrasena = document.querySelector("#contrasena").value;
    console.log(usuario, contrasena);

    // Crea un objeto con los datos del usuario para enviar al servidor
    let mensaje = { "usuario": usuario, "contrasena": contrasena };

    // Envía una solicitud POST al servidor usando fetch
    fetch("../servidor/?o=buscar&tabla=usuarios", {
        method: 'POST', // Método HTTP POST para enviar datos
        headers: {
            'Content-Type': 'application/json', // Especifica que el cuerpo de la solicitud es JSON
        },
        body: JSON.stringify(mensaje), // Convierte el objeto mensaje a formato JSON
    })
    // Espera la respuesta del servidor y la convierte a formato JSON
    .then(response => {
        return response.json(); // Devuelve la respuesta en formato JSON
    })
    // Maneja los datos recibidos del servidor
    .then(data => {
        console.log(data); // Muestra los datos recibidos en la consola para depuración

        // Verifica si la respuesta contiene datos (si el login fue exitoso)
        if (data.length > 0) {
            console.log("Entras correctamente");

            // Guarda el nombre de usuario en el localStorage para recordar al usuario
            localStorage.setItem('crimson_usuario', data[0].usuario);

            // Muestra un mensaje de éxito en verde
            document.querySelector("#feedback").style.color = "green";
            document.querySelector("#feedback").innerHTML = "Acceso correcto. Redirigiendo en 5 segundos...";

            // Redirecciona al escritorio después de 5 segundos
            setTimeout(function() {
                window.location = "escritorio/index.html";
            }, 5000);
        } else {
            // Si no se encuentran datos (login fallido), muestra un mensaje de error
            console.log("Error al entrar");

            // Muestra un mensaje de error en rojo
            document.querySelector("#feedback").style.color = "red";
            document.querySelector("#feedback").innerHTML = "Usuario incorrecto. Redirigiendo en 5 segundos...";

            // Recarga la página después de 5 segundos para intentar nuevamente
            setTimeout(function() {
                window.location = window.location;
            }, 5000);
        }
    })
    // Maneja cualquier error que ocurra durante la solicitud
    .catch(error => {
        console.error("Error en la solicitud:", error);
        document.querySelector("#feedback").style.color = "red";
        document.querySelector("#feedback").innerHTML = "Error de red. Inténtelo de nuevo más tarde.";
    });
}
