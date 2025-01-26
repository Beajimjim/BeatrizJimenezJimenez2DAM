function poblarMenuNavegacion(datos) {
    // Seleccionar el elemento <ul> del menú de navegación donde se agregarán las entradas dinámicas
    let menu = document.querySelector("nav ul");

    // Iterar sobre los datos recibidos, que representan las tablas obtenidas del servidor
    datos.forEach(function(tabla) {
        // Obtener el nombre de la tabla del objeto recibido
        let nombre_de_la_tabla = tabla['Tables_in_crimson'];

        // Crear un nuevo elemento de lista (<li>) en memoria
        let elemento = document.createElement("li");

        // Establecer el texto del elemento como el nombre de la tabla
        elemento.textContent = nombre_de_la_tabla;

        // Añadir un atributo "jvtooltip" con un mensaje personalizado para cada tabla
        elemento.setAttribute("jvtooltip", "Haz click para cargar la información de la tabla " + nombre_de_la_tabla);

        // Añadir un atributo "comentario" con la descripción adicional de la tabla
        elemento.setAttribute("comentario", tabla['Comentario']);

        // Evento que se activa al hacer clic en el elemento del menú
        elemento.onclick = function() {
            // Obtener el texto del elemento clicado (nombre de la tabla)
            let texto = this.textContent;

            // Llamar a la función para cargar los datos de la tabla seleccionada
            cargaDatosTabla(texto);

            // Actualizar el título y el subtítulo de la tabla en la interfaz
            document.querySelector(".titulotabla h5").textContent = this.textContent; // Nombre de la tabla
            document.querySelector(".titulotabla p").textContent = this.getAttribute("comentario"); // Comentario de la tabla

            // Eliminar la clase "menuseleccionado" de todos los elementos del menú
            let elementosmenu = document.querySelectorAll("nav ul li");
            elementosmenu.forEach(function(elemento) {
                elemento.classList.remove("menuseleccionado");
            });

            // Añadir la clase "menuseleccionado" al elemento clicado para resaltar la selección
            this.classList.add("menuseleccionado");
        };

        // Añadir el nuevo elemento (<li>) al menú de navegación (<ul>)
        menu.appendChild(elemento);
    });
}



// Explicación por secciones
// Selección del menú:

// Se selecciona el contenedor <ul> del menú de navegación donde se agregarán los elementos dinámicos.
// Iteración sobre los datos de las tablas:

// Se recorren las tablas recibidas desde el servidor, representadas por el objeto datos.
// Creación de un nuevo elemento <li>:

// Por cada tabla, se crea un elemento de lista.
// Se establece su texto como el nombre de la tabla.
// Atributos adicionales:

// jvtooltip: Mensaje que describe la acción que realizará el clic.
// comentario: Información adicional asociada a la tabla, útil para mostrar detalles.
// Evento onclick para los elementos del menú:

// Al hacer clic en un elemento, se:
// Carga dinámicamente la tabla seleccionada.
// Actualiza el título y subtítulo de la tabla en la interfaz.
// Resalta el elemento seleccionado aplicando la clase menuseleccionado.
// Limpieza de selecciones anteriores:

// Antes de resaltar el elemento seleccionado, se elimina la clase menuseleccionado de todos los demás elementos del menú.
// Inserción del elemento en el menú:

// Se agrega el nuevo <li> al contenedor <ul> del menú de navegación.
// Propósito del código
// El código genera un menú de navegación dinámico basado en tablas obtenidas del servidor. Cada elemento permite al usuario:

// Cargar datos de una tabla seleccionada.
// Visualizar un comentario descriptivo asociado a la tabla.
// Resaltar la tabla seleccionada para mejorar la experiencia de usuario.