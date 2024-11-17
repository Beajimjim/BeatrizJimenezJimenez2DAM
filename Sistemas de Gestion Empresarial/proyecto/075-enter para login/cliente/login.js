// Ejecuta la función cuando la página haya terminado de cargar
window.onload = function() {
  console.log("JavaScript cargado");

  // Asigna una función al botón de login cuando se hace clic
  document.querySelector("#login").onclick = function() {
      console.log("Has pulsado el botón de login");

      // Obtiene los valores del usuario y la contraseña ingresados
      let usuario = document.querySelector("#usuario").value;
      let contrasena = document.querySelector("#contrasena").value;
      console.log(usuario, contrasena);

      // Crea un objeto con los datos del usuario para enviar al servidor
      let mensaje = { "usuario": usuario, "contrasena": contrasena };

      // Envía los datos al servidor mediante una solicitud POST usando fetch
      fetch("../servidor/?o=buscar&tabla=usuarios", {
          method: 'POST', // Método HTTP POST para enviar datos
          headers: {
              'Content-Type': 'application/json', // Especifica el tipo de contenido como JSON
          },
          body: JSON.stringify(mensaje), // Convierte el objeto mensaje a JSON para enviarlo
      })
      // Espera la respuesta del servidor y la convierte a JSON
      .then(response => {
          return response.json(); // Devuelve la respuesta en formato JSON
      })
      // Maneja los datos recibidos del servidor
      .then(data => {
          console.log(data); // Muestra los datos recibidos en la consola

          // Verifica si la respuesta contiene datos (login exitoso)
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
              // Si no se encuentran datos, muestra un mensaje de error
              console.log("Error al entrar");

              // Muestra un mensaje de error en rojo
              document.querySelector("#feedback").style.color = "red";
              document.querySelector("#feedback").innerHTML = "Usuario incorrecto. Redirigiendo en 5 segundos...";

              // Recarga la página después de 5 segundos
              setTimeout(function() {
                  window.location = window.location;
              }, 5000);
          }
      });
  }

  // Asigna una función para manejar el evento de presionar una tecla
  document.onkeypress = function(e) {
      console.log("Has pulsado una tecla");

      // Verifica si la tecla presionada es 'Enter'
      if (e.code == "Enter") {
          console.log("Y la tecla es enter");

          // Obtiene los valores del usuario y la contraseña ingresados
          let usuario = document.querySelector("#usuario").value;
          let contrasena = document.querySelector("#contrasena").value;
          console.log(usuario, contrasena);

          // Crea un objeto con los datos del usuario para enviar al servidor
          let mensaje = { "usuario": usuario, "contrasena": contrasena };

          // Envía los datos al servidor mediante una solicitud POST usando fetch
          fetch("../servidor/?o=buscar&tabla=usuarios", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(mensaje),
          })
          // Espera la respuesta del servidor y la convierte a JSON
          .then(response => {
              return response.json();
          })
          // Maneja los datos recibidos del servidor
          .then(data => {
              console.log(data);

              // Verifica si la respuesta contiene datos (login exitoso)
              if (data.length > 0) {
                  console.log("Entras correctamente");

                  // Guarda el nombre de usuario en el localStorage
                  localStorage.setItem('crimson_usuario', data[0].usuario);

                  // Muestra un mensaje de éxito en verde
                  document.querySelector("#feedback").style.color = "green";
                  document.querySelector("#feedback").innerHTML = "Acceso correcto. Redirigiendo en 5 segundos...";

                  // Redirecciona al escritorio después de 5 segundos
                  setTimeout(function() {
                      window.location = "escritorio/index.html";
                  }, 5000);
              } else {
                  // Si no se encuentran datos, muestra un mensaje de error
                  console.log("Error al entrar");

                  // Muestra un mensaje de error en rojo
                  document.querySelector("#feedback").style.color = "red";
                  document.querySelector("#feedback").innerHTML = "Usuario incorrecto. Redirigiendo en 5 segundos...";

                  // Recarga la página después de 5 segundos
                  setTimeout(function() {
                      window.location = window.location;
                  }, 5000);
              }
          });
      }
  }
}
