// Se crea un objeto vacío para almacenar los datos de inicio de sesión.
const datos_login = new Object();

// Se establece una función que se ejecutará cuando la ventana se haya cargado completamente.
window.onload = function() {
    console.log("Javascript cargado"); // Indica en la consola que el archivo JavaScript ha sido cargado.

    // Se asigna un evento 'onclick' al botón con el ID 'usuario_login'.
    document.querySelector("#usuario_login").onclick = function() {
        console.log("Has pulsado el boton"); // Muestra un mensaje en la consola cuando el botón es presionado.

        // Se obtienen los valores de los campos de entrada para el usuario y la contraseña y se almacenan en el objeto 'datos_login'.
        datos_login.usuario = document.querySelector("#usuario").value; // Captura el valor del campo de usuario.
        datos_login.contrasena = document.querySelector("#contrasena").value; // Captura el valor del campo de contraseña.
        
        // Muestra en la consola el objeto 'datos_login' que contiene los datos recogidos.
        console.log("Devuelvo un json:", datos_login);
        
        // Se realiza una solicitud GET a un microservicio, enviando los datos de usuario y contraseña como parámetros de consulta.
        fetch("../servidor/loginusuario.php?usuario=" + datos_login.usuario + "&contrasena=" + datos_login.contrasena)
            .then(response => {
                return response.json(); // Convierte la respuesta del servidor en un objeto JSON.
            })
            .then(datos_login => {
                console.log('Resultado:', datos_login); // Muestra en la consola el resultado recibido del servidor.
            });
    }
}
