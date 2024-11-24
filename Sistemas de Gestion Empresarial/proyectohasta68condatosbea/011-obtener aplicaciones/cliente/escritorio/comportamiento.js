// Se establece una función que se ejecutará cuando la ventana se haya cargado completamente.
window.onload = function() {
  // Se realiza una solicitud fetch para obtener la lista de aplicaciones desde el microservicio especificado.
  fetch("../../servidor/lista_aplicaciones.php") // Llama a un microservicio que devuelve la lista de aplicaciones.
      .then(response => {
          return response.json(); // Convierte la respuesta del servidor en un objeto JSON.
      })
      .then(data => {
          console.log(data); // Muestra el JSON recibido en la consola para verificar su contenido.
      });
}
