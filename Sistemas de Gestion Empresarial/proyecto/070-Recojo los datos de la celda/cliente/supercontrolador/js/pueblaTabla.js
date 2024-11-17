              
 // Función para poblar el contenido de una tabla HTML con datos, incluyendo edición en línea y eliminación
function pueblaTabla(datos, campoclave, tabla) {
    // Selecciono el cuerpo (tbody) de la tabla donde se insertarán los datos
    let contenidotabla = document.querySelector("section table tbody");

    // Limpio el contenido de la tabla por si ya hay datos previos
    contenidotabla.innerHTML = "";

    // Recorro cada registro del array de datos
    datos.forEach(function (registro) {
        let clave_primaria; // Variable para almacenar la clave primaria del registro
        let nuevafila = document.createElement("tr"); // Creo una nueva fila para cada registro

        // Recorro las propiedades del objeto (registro) usando Object.keys
        Object.keys(registro).forEach(clave => {
            // Si la clave actual es la clave primaria
            if (clave == campoclave) {
                clave_primaria = registro[clave]; // Guardo el valor de la clave primaria
            }

            // Creo una nueva celda (columna) HTML
            let nuevacolumna = document.createElement("td");
            nuevacolumna.textContent = registro[clave]; // Asigno el contenido de texto a la celda

            // Establezco atributos personalizados para identificar la celda
            nuevacolumna.setAttribute("tabla", tabla);
            nuevacolumna.setAttribute("columna", clave);
            nuevacolumna.setAttribute("Identificador", clave_primaria);

            // Hago que la celda sea editable al hacer doble clic
            nuevacolumna.ondblclick = function () {
                console.log("Has hecho clic en una celda");
                this.setAttribute("contenteditable", "true"); // Permito la edición
                this.focus(); // Pongo el foco en la celda para que el usuario pueda escribir
            };

            // Al perder el foco, desactivo la edición y preparo el mensaje para enviar al servidor
            nuevacolumna.onblur = function () {
                this.setAttribute("contenteditable", "false"); // Desactivo la edición
                // Creo un objeto con la información necesaria para actualizar el registro
                let mensaje = {
                    "tabla": this.getAttribute("tabla"),
                    "columna": this.getAttribute("columna"),
                    "Identificador": this.getAttribute("Identificador"),
                    "valor": this.textContent
                };
                console.log(mensaje); // Muestro el mensaje en la consola (puedes sustituir esto por una llamada al servidor)
            };

            // Inserto la celda dentro de la fila
            nuevafila.appendChild(nuevacolumna);
        });

        // Creo una nueva celda para la papelera (icono de eliminación)
        let nuevacolumna = document.createElement("td");
        nuevacolumna.textContent = "🗑️"; // Icono de papelera
        nuevacolumna.setAttribute("claveprimaria", clave_primaria); // Atributo con la clave primaria del registro

        // Manejo del clic en la papelera para eliminar el registro
        nuevacolumna.onclick = function () {
            console.log("Vamos a eliminar algo"); // Mensaje en consola
            let identificador = this.getAttribute("claveprimaria"); // Obtengo el identificador del registro

            // Envío una solicitud al servidor para eliminar el registro usando fetch
            fetch(`../../servidor/?o=eliminar&tabla=${tabla}&id=${identificador}`)
                .then(response => {
                    if (response.ok) {
                        this.parentElement.remove(); // Elimino la fila visualmente si la solicitud fue exitosa
                    } else {
                        console.error("Error al eliminar el registro:", response.statusText);
                    }
                })
                .catch(error => {
                    console.error("Error en la solicitud fetch:", error);
                });
        };

        // Inserto la celda de papelera en la fila
        nuevafila.appendChild(nuevacolumna);

        // Inserto la fila completa dentro del cuerpo de la tabla
        contenidotabla.appendChild(nuevafila);
    });
}

  /////////////////////////////////// CREO UNA FUNCIÓN PARA POBLAR EL CONTENIDO DE LAS TABLAS /////////////////////////////////////////////


// //   Análisis del Código
// Recorrido de Datos: Utilizas forEach para recorrer los datos (un array de objetos) y Object.keys para iterar sobre las propiedades del objeto. Esto es correcto y te permite obtener todas las claves y valores de cada registro.

// Edición en Línea:

// Haces que las celdas sean editables al hacer doble clic (ondblclick).
// Al salir de la celda (onblur), se desactiva la edición y se genera un mensaje con la información necesaria para actualizar el registro en el servidor.
// Eliminación de Filas:

// Agregas una columna con un icono de papelera para eliminar filas.
// Cuando se hace clic, envías una solicitud fetch al servidor para eliminar el registro y también eliminas visualmente la fila de la tabla.