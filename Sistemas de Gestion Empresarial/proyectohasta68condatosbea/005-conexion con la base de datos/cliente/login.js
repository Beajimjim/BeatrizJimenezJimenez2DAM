// Se establece una función que se ejecutará cuando la ventana se haya cargado completamente.
window.onload = function() {
  console.log("Javascript cargado"); // Muestra en la consola que el archivo JavaScript ha sido cargado.

  // Se asigna un evento 'onclick' al botón con el ID 'send_usuario_login'.
  document.querySelector("#send_usuario_login").onclick = function() {
      console.log("Has pulsado el boton"); // Indica en la consola que el botón ha sido presionado.
      
      // Se obtienen los valores de los campos de entrada para el usuario y la contraseña.
      let usuario = document.querySelector("#usuario").value; // Captura el valor del campo de usuario.
      let contrasena = document.querySelector("#contrasena").value; // Captura el valor del campo de contraseña.

      // Muestra en la consola los datos recogidos del formulario.
      console.log("datos recogidos:", usuario, contrasena);
      
      // Se crea un objeto 'envio' que contiene los datos del usuario y la contraseña.
      let envio = {"usuario": usuario, "contrasena": contrasena};

      // Muestra en la consola el objeto que se va a enviar.
      console.log(envio);

      // Se realiza una solicitud POST a un microservicio para enviar la información en formato JSON.
      fetch("../servidor/loginusuario.php", {
          method: 'POST', // Especifica el método HTTP a usar.
          headers: {
              'Content-Type': 'application/json', // Indica que se está enviando JSON.
          },
          body: JSON.stringify(envio), // Convierte el objeto 'envio' a una cadena JSON para enviarlo en el cuerpo de la solicitud.
      })
      .then(response => {
          return response.json(); // Convierte la respuesta del servidor en un objeto JSON.
      })
      .then(data => {
          console.log('Success:', data); // Muestra en la consola la respuesta JSON recibida del servidor, confirmando que la comunicación fue exitosa.
      });
  }
}