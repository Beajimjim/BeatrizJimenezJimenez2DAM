// Se crea un objeto vacío 'datos_login' para almacenar las credenciales del usuario.
let datos_login = new Object();

// Se establece una función que se ejecutará cuando la ventana se haya cargado completamente.
window.onload = function() {
    console.log("Javascript cargado"); // Indica en la consola que el archivo JavaScript ha sido cargado.

    // Se asigna un evento 'onclick' al botón con el ID 'usuario_login'.
    document.querySelector("#usuario_login").onclick = function() {
        console.log("Has pulsado el boton"); // Muestra un mensaje en la consola cuando el botón es presionado.
        
        // Se obtienen los valores de los campos de entrada para el usuario y la contraseña y se almacenan en el objeto 'datos_login'.
        datos_login.usuario = document.querySelector("#usuario").value; // Captura el valor del campo de usuario.
        datos_login.password = document.querySelector("#password").value; // Captura el valor del campo de contraseña.

        // Muestra en la consola el objeto 'datos_login' que contiene los datos recogidos.
        console.log("Devuelvo un json:", datos_login);

        // Se realiza una solicitud fetch para enviar los datos al microservicio 'loginusuario.php' usando parámetros GET.
        fetch("../servidor/loginusuario.php?usuario=" + datos_login.usuario + "&password=" + datos_login.password)
            .then(response => {
                return response.json(); // Convierte la respuesta del servidor en un objeto JSON.
            })
            .then(datosRespuestaFetch => { // Maneja la respuesta del servidor
                console.log('Resultado:', datosRespuestaFetch); // Muestra en la consola la respuesta recibida del servidor.

                // Se verifica si el resultado indica un inicio de sesión exitoso.
                if (datosRespuestaFetch.resultado == 'ok') { // En el caso de que el login sea satisfactorio
                    console.log("Entras correctamente"); // Mensaje de éxito en la consola.
                    
                    // Guarda el nombre de usuario en localStorage para recordar la sesión.
                    localStorage.setItem('appsge_usuario', datosRespuestaFetch.usuario);
                    
                    // Muestra un mensaje indicando que el inicio de sesión fue correcto.
                    document.querySelector("#login_correct").innerHTML = "Usuario correcto. Redirigiendo en 5 segundos...";
                    
                    // Redirige a la página "escritorio/index.html" después de 5 segundos.
                    setTimeout(function() {
                        window.location = "escritorio/index.html"; // Navega a la página de escritorio.
                    }, 5000);
                } else { // En caso de error en el inicio de sesión
                    console.log("Error al entrar"); // Mensaje de error en la consola.

                    // Muestra un mensaje de error al usuario en la interfaz.
                    document.querySelector("#login_incorrect").innerHTML = "Usuario incorrecto. Redirigiendo en 5 segundos...";
                    
                    // Redirige a la misma página después de 5 segundos.
                    setTimeout(function() {
                        window.location = window.location; // Recarga la página.
                    }, 5000);
                }
            });
    }
}

//datosRespuestaFetch => una vez que hemos llegado a base de datos y hecho la peticion, solo va a devolvernos el campo usuario. Esto se debe a que en el loginusuario.php
// le hemos dicho que solo se traiga eso cuando haga la peticion y encuentre un usuario y contraseña que coincidan con lo introducido en el login.
//Por ello, cuando llegamos a este punto "datosRespuestaFetch", no podemos intentar mostrar ningun dato más como la contraseña porque no nos lo hemos traido.