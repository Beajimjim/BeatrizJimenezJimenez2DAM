/////////////////////////////////// FUNCIÓN PARA CARGAR DINÁMICAMENTE TABLAS /////////////////////////////////////////////

function cargaDatosTabla(tabla) {
    let campoclave; // Variable para almacenar el nombre del campo que actúa como clave primaria.

    /////////////////////////////////// OBTENER LISTADO DE COLUMNAS DE LA TABLA /////////////////////////////////////////////

    // Llamada al servidor para obtener las columnas de la tabla.
    fetch("../../servidor/?o=columnastabla&tabla=" + tabla)
        .then(response => {
            return response.json(); // Se espera una respuesta en formato JSON.
        })
        .then(datos => {
            // Inicializar estructuras de datos para las columnas y tipos.
            columnas_tabla = []; // Lista de columnas de la tabla.
            tipos_tabla = []; // Tipos de datos de cada columna.
            claves_tabla = []; // Claves primarias o foráneas.
            campos_busqueda = []; // Campos de entrada para realizar búsquedas.

            // Seleccionar y limpiar el área de encabezados de la tabla.
            let cabeceras_tabla = document.querySelector("table thead tr");
            cabeceras_tabla.innerHTML = ""; // Vaciar las cabeceras existentes.

            // Procesar cada columna recibida desde el servidor.
            datos.forEach(function (dato) {
                let elemento = document.createElement("th"); // Crear un elemento para la cabecera.
                columnas_tabla.push(dato["Field"]); // Añadir el nombre del campo a la lista de columnas.

                elemento.textContent = dato["Field"]; // Usar el nombre del campo como texto de la cabecera.

                // Crear un campo de búsqueda para cada columna.
                let inputBusqueda = document.createElement("input");
                inputBusqueda.setAttribute("placeholder", dato["Field"]); // Placeholder con el nombre del campo.
                inputBusqueda.setAttribute("type", convierteTipoDato(dato["Type"])); // Tipo de dato según el tipo del campo.
                campos_busqueda.push(inputBusqueda); // Añadir a la lista de campos de búsqueda.

                // Añadir los datos de clave y tipo de la columna.
                claves_tabla.push(dato["Key"]); // Guardar si es clave primaria o foránea.
                tipos_tabla.push(convierteTipoDato(dato["Type"])); // Guardar el tipo de dato.

                // Insertar el campo de búsqueda en la cabecera de la tabla.
                elemento.appendChild(inputBusqueda);
                cabeceras_tabla.appendChild(elemento);

                // Identificar si la columna es clave primaria.
                if (dato["Key"] === "PRI") {
                    campoclave = dato["Field"];
                }
            });

            // Añadir una columna extra con un ícono de lupa para búsquedas.
            let elemento = document.createElement("th");
            elemento.textContent = "🔍";
            cabeceras_tabla.appendChild(elemento);

            // Evento para realizar la búsqueda cuando se hace clic en la lupa.
            elemento.onclick = function () {
                let mensaje = {}; // Objeto vacío para almacenar criterios de búsqueda.

                // Recopilar valores de los campos de búsqueda.
                campos_busqueda.forEach(function (campo) {
                    let columna = campo.getAttribute("placeholder"); // Nombre del campo.
                    let valor = campo.value; // Valor ingresado por el usuario.
                    if (valor !== "") {
                        mensaje[columna] = valor; // Añadir al objeto si el campo no está vacío.
                    }
                });

                // Enviar los criterios de búsqueda al servidor.
                fetch("../../servidor/?o=buscarSimilar&tabla=" + tabla, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(mensaje),
                })
                    .then(response => {
                        return response.json(); // Respuesta en formato JSON.
                    })
                    .then(datos => {
                        // Actualizar la tabla con los datos recibidos.
                        pueblaTabla(datos, campoclave, tabla);
                    });
            };

            /////////////////////////////////// CREAR FORMULARIO EN EL MODAL PARA INSERCIÓN /////////////////////////////////////////////

            let coleccioncampos = []; // Lista de campos del formulario.
            let contiene_modal = document.querySelector("#contienemodal"); // Contenedor del modal.

            // Configurar el encabezado del formulario en el modal.
            contiene_modal.innerHTML = "<h1>Formulario de inserción: " + tabla + "</h1>";

            let seccion = document.createElement("section"); // Crear una sección para los campos.

            // Crear campos para cada columna.
            columnas_tabla.forEach(function (columna, index) {
                let contenedor = document.createElement("div"); // Contenedor para cada campo.
                let texto = document.createElement("p"); // Etiqueta con descripción.
                texto.textContent = "Inserta un nuevo elemento para: " + columna;
                contenedor.appendChild(texto);

                if (claves_tabla[index] !== "MUL") {
                    // Crear un campo de entrada estándar si no es clave foránea.
                    let inputCampo = document.createElement("input");
                    inputCampo.setAttribute("type", tipos_tabla[index]); // Tipo de dato.
                    inputCampo.setAttribute("placeholder", columna); // Placeholder.
                    coleccioncampos.push(inputCampo); // Añadir a la colección de campos.
                    contenedor.appendChild(inputCampo); // Añadir al contenedor.
                } else {
                    // Crear un select si es una clave foránea.
                    let selectElement = document.createElement("select");
                    coleccioncampos.push(selectElement);

                    // Añadir una opción por defecto al select.
                    let defaultOption = document.createElement("option");
                    defaultOption.textContent = "Selecciona una opción:";
                    selectElement.appendChild(defaultOption);

                    // Cargar opciones dinámicamente desde el servidor.
                    fetchOptionsForSelect(selectElement, columna);
                    selectElement.setAttribute("placeholder", columna);
                    contenedor.appendChild(selectElement);
                    selectjv(selectElement); // Personalizar el select.
                }

                // Añadir el campo al formulario.
                seccion.appendChild(contenedor);
            });

            contiene_modal.appendChild(seccion);

            // Crear botón de envío para el formulario.
            let boton_enviar = document.createElement("button");
            boton_enviar.textContent = "Enviar"; // Texto del botón.

            // Evento para enviar el formulario.
            boton_enviar.onclick = function () {
                let formData = new FormData(); // Crear objeto FormData para envío.

                // Recopilar datos de los campos del formulario.
                coleccioncampos.forEach(function (campo) {
                    if (campo.getAttribute("placeholder") !== "Identificador") {
                        if (campo.getAttribute("type") === "file") {
                            formData.append(campo.getAttribute("placeholder"), campo.files[0]);
                        } else {
                            formData.append(campo.getAttribute("placeholder"), campo.value);
                        }
                    }
                });

                // Enviar los datos al servidor.
                fetch("../../servidor/?o=insertar&tabla=" + tabla, {
                    method: "POST",
                    body: formData,
                })
                    .then(response => response.text())
                    .then(datos => {
                        console.log(datos);
                        // Cerrar el modal tras completar la inserción.
                        document.querySelector("#modal").classList.remove("aparece");
                        document.querySelector("#modal").classList.add("desaparece");
                        setTimeout(() => {
                            document.querySelector("#modal").style.display = "none";
                        }, 1000);
                    });
            };

            contiene_modal.appendChild(boton_enviar); // Añadir el botón al modal.

            /////////////////////////////////// CARGAR CONTENIDO DE LA TABLA /////////////////////////////////////////////

            // Llamada al servidor para obtener los datos de la tabla.
            fetch("../../servidor/?o=tabla&tabla=" + tabla)
                .then(response => response.json())
                .then(datos => {
                    // Mostrar los datos en la tabla.
                    pueblaTabla(datos, campoclave, tabla);
                });
        });
}

/////////////////////////////////// FUNCIÓN PARA CARGAR OPCIONES EN UN SELECT /////////////////////////////////////////////

function fetchOptionsForSelect(selectElement, column) {
    // Llamar al servidor para obtener datos relacionados con la tabla indicada
    // El nombre de la tabla se extrae del nombre de la columna antes del guion bajo ("_").
    fetch("../../servidor/?o=tabla&tabla=" + column.split("_")[0])
        .then(response => response.json()) // Convertir la respuesta del servidor a formato JSON.
        .then(datos => {
            // Iterar sobre los datos recibidos del servidor.
            datos.forEach(function (dato) {
                // Crear un nuevo elemento de opción (<option>) para el select.
                let option = document.createElement("option");
                
                // Establecer el valor de la opción con el identificador único del dato.
                option.value = dato["Identificador"];
                
                // Establecer el texto visible de la opción concatenando los valores del dato.
                option.textContent = Object.values(dato).join(" - ");
                
                // Añadir la opción al elemento select proporcionado.
                selectElement.appendChild(option);
            });
        });
}



// Resumen de Funcionalidad
// Carga dinámica de columnas y datos de la tabla desde el servidor.
// Generación de un formulario de inserción dinámico en un modal.
// Soporte para búsquedas dinámicas en la tabla.
// Inserción de datos en la base de datos mediante un formulario.
// Creación de select dinámicos con opciones relacionadas.
// Este código automatiza la gestión de tablas en una interfaz web interactiva.