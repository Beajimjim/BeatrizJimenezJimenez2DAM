function selectjv(selector) {
  // Array para almacenar los contenedores personalizados
  contenedores = [];

  // Crear un nuevo contenedor (div) para reemplazar el <select>
  contenedores.push(document.createElement("div"));
  contenedores[contenedores.length - 1].classList.add("selectjv"); // Añadir clase al contenedor

  // Evitar que el click en el contenedor se propague al documento
  contenedores[contenedores.length - 1].onclick = function (e) {
      e.stopPropagation();
  };

  // Reemplazar el <select> original por el nuevo contenedor
  selector.replaceWith(contenedores[contenedores.length - 1]);

  // Crear un div para la caja de selección (caja)
  let caja = document.createElement("div");
  caja.classList.add("caja"); // Añadir clase a la caja
  caja.textContent = selector.querySelector("option:first-child").textContent; // Mostrar el texto del primer <option>
  contenedores[contenedores.length - 1].appendChild(caja); // Añadir la caja al contenedor
  contenedores[contenedores.length - 1].appendChild(selector); // Añadir el <select> al contenedor

  // Evento para mostrar las opciones al hacer click en la caja
  caja.onclick = function (e) {
      e.stopPropagation();
      caja.classList.add("radio2"); // Cambiar la clase para indicar que está activo

      // Crear el div para mostrar los resultados de búsqueda
      let resultados = document.createElement("div");
      resultados.classList.add("resultados"); // Añadir clase a los resultados
      this.appendChild(resultados); // Añadir resultados a la caja

      // Crear campo de búsqueda (input)
      let buscador = document.createElement("input");
      buscador.setAttribute("type", "search"); // Tipo de input: búsqueda
      buscador.setAttribute("placeholder", "busca..."); // Placeholder
      resultados.appendChild(buscador); // Añadir buscador a los resultados

      // Evento para evitar que el click en el buscador se propague
      buscador.onclick = function (e) {
          console.log("ok hola");
          e.stopPropagation();
      };

      // Evento para filtrar las opciones al escribir en el buscador
      buscador.onkeyup = function (e) {
          let busca = this.value; // Texto de búsqueda
          contieneresultados.innerHTML = ""; // Limpiar resultados anteriores

          // Filtrar y mostrar solo las opciones que coinciden con la búsqueda
          opciones.forEach(function (opcion) {
              if (opcion.textContent.toLowerCase().includes(busca.toLowerCase())) {
                  let texto = document.createElement("p");
                  texto.textContent = opcion.textContent; // Texto de la opción
                  contieneresultados.appendChild(texto); // Añadir opción a los resultados

                  // Evento al hacer click en una opción
                  texto.onclick = function () {
                      console.log("Has hecho click en una opción:", texto.textContent);
                      resultados.remove(); // Eliminar resultados
                      caja.textContent = texto.textContent; // Actualizar el texto de la caja

                      // Actualizar el <select> original para reflejar la opción seleccionada
                      let opciones2 = selector.querySelectorAll("option");
                      opciones2.forEach(function (opcion2) {
                          if (opcion2.textContent == texto.textContent) {
                              opcion2.setAttribute("selected", true); // Marcar como seleccionada
                          } else {
                              opcion2.removeAttribute("selected"); // Desmarcar
                          }
                      });
                  };
              }
          });
      };

      // Crear contenedor para las opciones
      let contieneresultados = document.createElement("div");
      contieneresultados.onclick = function (e) {
          e.stopPropagation(); // Evitar propagación del click
      };

      // Obtener todas las opciones del <select>
      let opciones = selector.querySelectorAll("option");

      // Añadir cada opción al contenedor de resultados
      opciones.forEach(function (opcion) {
          let texto = document.createElement("p");
          texto.textContent = opcion.textContent; // Texto de la opción
          contieneresultados.appendChild(texto); // Añadir opción al contenedor

          // Evento al hacer click en una opción
          texto.onclick = function () {
              console.log("Has hecho click en una opción:", texto.textContent);
              resultados.remove(); // Eliminar resultados
              caja.textContent = texto.textContent; // Actualizar el texto de la caja

              // Actualizar el <select> original para reflejar la opción seleccionada
              let opciones2 = selector.querySelectorAll("option");
              opciones2.forEach(function (opcion2) {
                  if (opcion2.textContent == texto.textContent) {
                      opcion2.setAttribute("selected", true); // Marcar como seleccionada
                  } else {
                      opcion2.removeAttribute("selected"); // Desmarcar
                  }
              });
          };
      });

      // Añadir contenedor de opciones a los resultados
      resultados.appendChild(contieneresultados);

      // Evitar que el click en resultados se propague
      resultados.onclick = function (e) {
          e.stopPropagation();
      };
  };

  // Evento para cerrar el menú al hacer click fuera del contenedor
  document.onclick = function () {
      console.log("ok body");
      contenedores.forEach(function (contenedor) {
          console.log(contenedor);
          try {
              // Eliminar el div de resultados y restablecer la clase de la caja
              contenedor.querySelector(".resultados").remove();
              contenedor.querySelector(".caja").classList.remove("radio2");
          } catch (error) {
              console.log("Error, pero no pasa nada"); // Manejar errores silenciosamente
          }
      });
  };
}


// Resumen de la Funcionalidad:
// Creación de Contenedor: Reemplaza el <select> original por un contenedor personalizado (div).
// Caja de Selección: Muestra el texto del primer <option> y actúa como botón para abrir el menú.
// Campo de Búsqueda: Permite filtrar las opciones al escribir.
// Resultados: Muestra las opciones filtradas y permite seleccionar una.
// Actualización del <select>: Cambia el atributo selected del <select> original según la opción elegida.
// Cerrar Menú: Si se hace click fuera del contenedor, se cierra el menú de opciones.
// Este código crea un select personalizado con funcionalidades de búsqueda y filtrado dinámico, reemplazando al <select> nativo del navegador.



// Este código es una función que reemplaza un elemento <select> HTML estándar por un componente personalizado hecho con JavaScript. En lugar de usar el menú desplegable nativo del navegador, la función crea una interfaz interactiva que permite buscar opciones y seleccionarlas de manera más visual. Vamos a desglosar qué hace realmente cada parte:

// 1. Reemplazar el <select> original
// La función toma un <select> (que recibe como argumento selector) y lo reemplaza por un contenedor (div) personalizado.
// Este contenedor actúa como la nueva versión del select.
// 2. Crear un nuevo contenedor
// Crea un div con la clase selectjv, que será el nuevo contenedor del select.
// Agrega un subcomponente llamado caja, que muestra el texto de la primera opción del select.
// 3. Interacción del usuario: Mostrar el menú
// Al hacer click en caja, se despliega un menú de opciones (resultados), que muestra todas las opciones del <select>.
// Dentro del menú, se incluye un campo de búsqueda (input) para filtrar las opciones en tiempo real.
// 4. Campo de búsqueda dinámico
// El usuario puede escribir en el campo de búsqueda.
// Cada vez que el usuario escribe algo, el código filtra las opciones para mostrar solo aquellas que contienen el texto ingresado.
// Esto permite encontrar opciones rápidamente, sin necesidad de desplazarse por toda la lista.
// 5. Selección de opción
// Cuando el usuario hace click en una opción:
// La lista de resultados se oculta.
// El texto de la opción seleccionada se muestra en caja.
// El atributo selected del <option> correspondiente se actualiza en el <select> original.
// Esto asegura que, aunque el elemento visual sea diferente, el <select> HTML sigue teniendo el valor correcto.
// 6. Cerrar el menú al hacer click fuera
// Si el usuario hace click fuera del contenedor, el menú de opciones se cierra automáticamente.
// Esto se implementa mediante un evento onclick en el documento.
// ¿Por qué hacerlo así?
// El código crea un select personalizado porque:

// Más control visual: Permite personalizar el diseño y la interacción, algo que es limitado con el <select> nativo del navegador.
// Búsqueda integrada: Añade la funcionalidad de búsqueda, útil para listas largas de opciones.
// Mejora de la experiencia del usuario: Ofrece una experiencia más interactiva y moderna.
// Problemas del código
// Uso de variables globales: El código utiliza contenedores sin declarar explícitamente la variable con let o const, lo que la convierte en global. Esto puede generar conflictos.
// Manejo de errores pobre: El uso de try-catch para eliminar el menú de resultados simplemente oculta los errores sin manejarlos adecuadamente.
// Falta de accesibilidad: Este select personalizado puede no ser accesible para usuarios con dispositivos de asistencia (screen readers).
// En resumen, este código convierte un <select> estándar en un componente interactivo, permitiendo buscar y seleccionar opciones de una forma más dinámica y visualmente atractiva.