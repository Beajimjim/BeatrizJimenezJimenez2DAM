function selectjv(selector) {
  // Crear un array global para almacenar los contenedores generados dinámicamente
  contenedores = [];

  // Crear un contenedor principal y añadirle la clase "selectjv"
  contenedores.push(document.createElement("div"));
  contenedores[contenedores.length - 1].classList.add("selectjv");

  // Detener la propagación del evento clic en el contenedor
  contenedores[contenedores.length - 1].onclick = function (e) {
      e.stopPropagation();
  };

  // Reemplazar el elemento select original con el nuevo contenedor
  selector.replaceWith(contenedores[contenedores.length - 1]);

  // Crear una caja para mostrar el texto del primer elemento del select
  let caja = document.createElement("div");
  caja.classList.add("caja");
  caja.textContent = selector.querySelector("option:first-child").textContent;
  contenedores[contenedores.length - 1].appendChild(caja); // Añadir la caja al contenedor

  // Volver a incluir el select dentro del contenedor personalizado
  contenedores[contenedores.length - 1].appendChild(selector);

  // Evento para mostrar las opciones al hacer clic en la caja
  caja.onclick = function (e) {
      e.stopPropagation(); // Evita que el clic se propague
      caja.classList.add("radio2"); // Cambia el estilo de la caja

      // Crear un contenedor para los resultados (opciones del select)
      let resultados = document.createElement("div");
      resultados.classList.add("resultados");
      this.appendChild(resultados);

      // Crear un campo de búsqueda
      let buscador = document.createElement("input");
      buscador.setAttribute("type", "search");
      buscador.setAttribute("placeholder", "busca...");
      resultados.appendChild(buscador);

      // Evento para evitar que el clic en el buscador cierre el menú
      buscador.onclick = function (e) {
          console.log("ok hola");
          e.stopPropagation();
      };

      // Evento al escribir en el buscador
      buscador.onkeyup = function (e) {
          let busca = this.value; // Obtener el valor del campo de búsqueda
          contieneresultados.innerHTML = ""; // Vaciar los resultados actuales

          // Filtrar y mostrar opciones que coincidan con el texto buscado
          opciones.forEach(function (opcion) {
              if (opcion.textContent.toLowerCase().includes(busca.toLowerCase())) {
                  let texto = document.createElement("p"); // Crear un elemento de texto
                  texto.textContent = opcion.textContent; // Asignar el texto de la opción
                  contieneresultados.appendChild(texto); // Añadirlo al contenedor de resultados

                  // Evento al seleccionar una opción
                  texto.onclick = function () {
                      console.log("has hecho click en una opcion: ", texto.textContent);
                      resultados.remove(); // Eliminar los resultados
                      caja.textContent = texto.textContent; // Actualizar el texto de la caja

                      // Actualizar el atributo "selected" del select original
                      let opciones2 = selector.querySelectorAll("option");
                      opciones2.forEach(function (opcion2) {
                          if (opcion2.textContent == texto.textContent) {
                              opcion2.setAttribute("selected", true);
                          } else {
                              opcion2.removeAttribute("selected");
                          }
                      });
                  };
              }
          });
      };

      // Crear un contenedor intermedio para las opciones
      let contieneresultados = document.createElement("div");
      contieneresultados.onclick = function (e) {
          e.stopPropagation(); // Evita cerrar el menú al hacer clic aquí
      };

      // Añadir todas las opciones al contenedor intermedio
      let opciones = selector.querySelectorAll("option");
      opciones.forEach(function (opcion) {
          let texto = document.createElement("p"); // Crear un elemento de texto
          texto.textContent = opcion.textContent; // Asignar el texto de la opción
          contieneresultados.appendChild(texto); // Añadirlo al contenedor de resultados

          // Evento al seleccionar una opción
          texto.onclick = function () {
              console.log("has hecho click en una opcion: ", texto.textContent);
              resultados.remove(); // Eliminar los resultados
              caja.textContent = texto.textContent; // Actualizar el texto de la caja

              // Actualizar el atributo "selected" del select original
              let opciones2 = selector.querySelectorAll("option");
              opciones2.forEach(function (opcion2) {
                  if (opcion2.textContent == texto.textContent) {
                      opcion2.setAttribute("selected", true);
                  } else {
                      opcion2.removeAttribute("selected");
                  }
              });
          };
      });

      resultados.appendChild(contieneresultados); // Añadir el contenedor de resultados al contenedor principal
      resultados.onclick = function (e) {
          e.stopPropagation(); // Evita cerrar el menú al hacer clic en los resultados
      };
  };

  // Evento para cerrar todos los menús desplegables al hacer clic fuera
  document.onclick = function () {
      console.log("ok body");
      contenedores.forEach(function (contenedor) {
          console.log(contenedor);
          try {
              contenedor.querySelector(".resultados").remove(); // Elimina los resultados desplegados
              contenedor.querySelector(".caja").classList.remove("radio2"); // Restablece la clase de la caja
          } catch (error) {
              console.log("error pero no pasa nada"); // Ignorar errores si no hay resultados visibles
          }
      });
  };
}




// Explicación general del código
// Personalización de un <select>:

// Se reemplaza un <select> HTML original por un contenedor dinámico con un diseño personalizado.
// Las opciones del <select> se convierten en elementos interactivos.
// Búsqueda dinámica:

// Se permite buscar opciones escribiendo en un campo de texto dentro del menú desplegable.
// Actualización del <select> original:

// Cuando el usuario selecciona una opción, se actualiza el atributo selected del <select> original para mantener la funcionalidad del formulario.
// Interactividad y animaciones:

// El código evita cerrar el menú al hacer clic dentro del contenedor.
// Utiliza eventos para gestionar la apertura, cierre y selección de opciones.
// Manejo de errores:

// Se implementa un try-catch para evitar problemas al intentar cerrar menús que ya están cerrados.