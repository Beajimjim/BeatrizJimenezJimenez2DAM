// Función que se ejecuta cuando la página ha cargado completamente
window.onload = function() {
    console.log("Javascript cargado"); // Indica en la consola que el archivo JavaScript se ha cargado correctamente

    // Asigna una función al evento `onclick` del botón con id "login"
    document.querySelector("#login").onclick = function() {
        login(); // Llama a la función `login` al hacer clic en el botón
    }

    // Captura el evento `onkeypress` para detectar la pulsación de teclas
    document.onkeypress = function(e) {
        console.log("Has pulsado una tecla"); // Indica en la consola que una tecla ha sido presionada
        if (e.code == "Enter") { // Comprueba si la tecla presionada es "Enter"
            console.log("Y la tecla es enter"); // Muestra en la consola si la tecla pulsada es "Enter"
            login(); // Llama a la función `login` si se presionó "Enter"
        }
    }
}

// Función que maneja el proceso de login
function login() {
    console.log("Has pulsado el botón"); // Indica que el botón de login ha sido presionado

    // Obtiene los valores de los campos de entrada del formulario
    let usuario = document.querySelector("#usuario").value; // Captura el valor del campo de usuario
    let contrasena = document.querySelector("#contrasena").value; // Captura el valor del campo de contraseña
    console.log(usuario, contrasena); // Muestra los valores ingresados (solo para depuración, elimina en producción)

    // Crea un objeto JSON con los datos de usuario y contraseña
    let mensaje = { "usuario": usuario, "contrasena": contrasena };

    // Realiza una solicitud HTTP POST al microservicio para enviar los datos de login
    fetch("../servidor/?o=buscar&tabla=usuarios", {
        method: 'POST', // Especifica el método HTTP
        headers: {
            'Content-Type': 'application/json', // Define que el cuerpo de la solicitud es JSON
        },
        body: JSON.stringify(mensaje), // Convierte el objeto `mensaje` a una cadena JSON
    })
    .then(response => {
        return response.json(); // Convierte la respuesta del servidor en un objeto JSON
    })
    .then(data => {
        console.log(data); // Muestra en la consola el JSON devuelto por el servidor (solo para depuración)

        if (data.length > 0) { // Verifica si el servidor devolvió datos (login exitoso)
            console.log("Entras correctamente"); // Muestra un mensaje de éxito en la consola

            // Almacena el usuario y el token en el almacenamiento local del navegador
            localStorage.setItem('crimson_usuario', data[0].usuario);
            localStorage.setItem('crimson_token', data[0].token);

            // Muestra un mensaje de éxito en la interfaz de usuario
            document.querySelector("#feedback").style.color = "green"; // Cambia el color del texto a verde
            document.querySelector("#feedback").innerHTML = "Acceso correcto. Redirigiendo en 5 segundos...";

            // Redirige al usuario a la página del escritorio después de 5 segundos
            setTimeout(function() {
                window.location = "escritorio/index.html"; // Redirección a la página de escritorio
            }, 5000);
        } else {
            console.log("Error al entrar"); // Muestra un mensaje de error en la consola

            // Muestra un mensaje de error en la interfaz de usuario
            document.querySelector("#feedback").style.color = "red"; // Cambia el color del texto a rojo
            document.querySelector("#feedback").innerHTML = "Usuario incorrecto. Intenta nuevamente.";

            // (Opcional) Comentar/descomentar para recargar la página después de un error
            setTimeout(function() {
                // window.location = window.location; // Recarga la página actual (comentado por ahora)
            }, 5000);
        }
    })
    .catch(error => { // Manejo de errores en caso de problemas con la solicitud
        // Muestra un mensaje de error en un elemento tipo "toast"
        document.querySelector("#toast").classList.add("animado");
        document.querySelector("#toast").textContent = "Error n.02 - Contacta con administrador";
        console.warn("Error:", error); // Muestra detalles del error en la consola
    });
}

// Este código implementa un sistema de login básico mediante JavaScript. Aquí tienes un resumen de su funcionamiento:

// Inicio del script:

// Cuando la página se carga, se vinculan dos eventos:
// Clic en el botón de login (#login) para llamar a la función login.
// Pulsar la tecla "Enter" para iniciar el login automáticamente.
// Función login:

// Recopila datos: Obtiene el usuario y la contraseña desde los campos de entrada.
// Envío al servidor: Usa fetch con una solicitud POST para enviar los datos al servidor en formato JSON.
// Procesa la respuesta:
// Si el login es exitoso:
// Guarda el usuario y el token en localStorage.
// Muestra un mensaje de éxito y redirige al usuario a la página "escritorio/index.html" después de 5 segundos.
// Si falla:
// Muestra un mensaje de error al usuario.
// Manejo de errores:
// Si ocurre un problema con la solicitud, muestra un mensaje de error genérico.
// Mensajes dinámicos:

// Utiliza colores y mensajes en pantalla para informar al usuario sobre el estado del login (verde para éxito, rojo para error).
// Depuración:

// Incluye mensajes en la consola para rastrear el flujo de ejecución y depurar errores.
// Mejoras sugeridas:
// Validar campos antes de enviar datos.
// Evitar mostrar credenciales en la consola.
// Personalizar mensajes de error según el caso.