/////////////////////////////////// CREO UNA FUNCIÓN PARA POBLAR EL CONTENIDO DE LAS TABLAS /////////////////////////////////////////////

function pueblaTabla(datos, campoclave, tabla) {
    // Seleccionar el contenido vacío del cuerpo de la tabla en el DOM
    let contenidotabla = document.querySelector("section table tbody");
    contenidotabla.innerHTML = ""; // Vaciar el contenido previo de la tabla

    // Iterar sobre cada registro del array `datos`
    datos.forEach(function (registro) {
        let clave_primaria; // Variable para almacenar el identificador del registro
        let nuevafila = document.createElement("tr"); // Crear una nueva fila HTML para cada registro

        // Recorrer cada clave del objeto `registro` (propiedades de cada fila)
        Object.keys(registro).forEach(clave => {
            // Si la clave actual es la clave primaria
            if (clave == campoclave) {
                clave_primaria = registro[clave]; // Guardar el valor de la clave primaria
            }

            // Crear una nueva celda para la columna
            let nuevacolumna = document.createElement("td");
            nuevacolumna.textContent = registro[clave]; // Asignar el contenido de la columna
            nuevacolumna.setAttribute("tabla", tabla); // Añadir un atributo personalizado con el nombre de la tabla
            nuevacolumna.setAttribute("columna", clave); // Añadir un atributo con el nombre de la columna
            nuevacolumna.setAttribute("Identificador", clave_primaria); // Añadir un atributo con la clave primaria

            // Evento: Habilitar edición en la celda al hacer doble clic
            nuevacolumna.ondblclick = function () {
                console.log("Has hecho click en una celda");
                this.setAttribute("contenteditable", "true"); // Permitir edición de contenido
                this.focus(); // Enfocar la celda
            };

            // Evento: Guardar cambios en la celda al perder el foco
            nuevacolumna.onblur = function () {
                this.setAttribute("contenteditable", "false"); // Deshabilitar edición
                // Crear un mensaje con los datos actualizados de la celda
                let mensaje = {
                    "tabla": this.getAttribute("tabla"),
                    "columna": this.getAttribute("columna"),
                    "Identificador": this.getAttribute("Identificador"),
                    "valor": this.textContent
                };

                // Enviar los datos actualizados al servidor
                fetch("../../servidor/?o=actualizar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(mensaje), // Enviar el mensaje como JSON
                })
                    .then(response => response.json()) // Esperar respuesta del servidor
                    .then(datos => {
                        console.log(datos); // Mostrar los datos de respuesta en consola
                    });
                console.log(mensaje); // Mostrar el mensaje en consola para depuración
            };

            // Añadir la celda a la fila
            nuevafila.appendChild(nuevacolumna);
        });

        // Crear una columna adicional con el ícono de papelera para eliminar registros
        let nuevacolumna = document.createElement("td");
        nuevacolumna.textContent = "🗑️"; // Usar un emoji como ícono de eliminar
        nuevacolumna.setAttribute("claveprimaria", clave_primaria); // Añadir la clave primaria como atributo

        // Evento: Eliminar un registro al hacer clic en la papelera
        nuevacolumna.onclick = function () {
            console.log("Vamos a eliminar algo"); // Mensaje de depuración
            let identificador = this.getAttribute("claveprimaria"); // Obtener el identificador del registro
            // Enviar una solicitud al servidor para eliminar el registro
            fetch("../../servidor/?o=eliminar&tabla=" + tabla + "&id=" + identificador);
            // Eliminar visualmente la fila de la tabla
            this.parentElement.remove();
        };

        // Añadir la columna de la papelera a la fila
        nuevafila.appendChild(nuevacolumna);

        // Añadir la fila completa al cuerpo de la tabla
        contenidotabla.appendChild(nuevafila);
    });
}

/////////////////////////////////// FIN DE LA FUNCIÓN PARA POBLAR EL CONTENIDO DE LAS TABLAS /////////////////////////////////////////////
// Explicación del código
// Objetivo principal:

// Poblar dinámicamente una tabla HTML con datos obtenidos del servidor.
// Pasos del proceso:

// Vaciar la tabla:

// Antes de agregar nuevos datos, se asegura de eliminar cualquier contenido previo en el cuerpo de la tabla (<tbody>).
// Crear filas y columnas:

// Por cada registro (registro) en datos:
// Se crea una nueva fila (<tr>).
// Por cada propiedad del registro (clave):
// Se crea una celda (<td>) y se llena con el valor correspondiente.
// Se añaden atributos personalizados (tabla, columna, Identificador) para facilitar futuras acciones.
// Habilitar edición:

// Al hacer doble clic en una celda, se activa el modo de edición (contenteditable).
// Cuando se pierde el foco (onblur), se envían los cambios al servidor mediante una solicitud fetch.
// Eliminar registros:

// Cada fila incluye una columna con un ícono de papelera (🗑️).
// Al hacer clic en el ícono, se envía una solicitud al servidor para eliminar el registro.
// También se elimina la fila correspondiente de la tabla en la interfaz.
// Interactividad:

// La tabla es completamente interactiva: permite editar celdas directamente y eliminar registros.
// Uso de atributos personalizados:

// Se utilizan atributos personalizados en las celdas (tabla, columna, Identificador) para identificar el contexto de cada acción (por ejemplo, a qué tabla, columna y registro pertenece la celda editada).
// Propósito
// Esta función convierte los datos obtenidos del servidor en una tabla interactiva en la interfaz del usuario, permitiendo edición y eliminación de registros en tiempo real.