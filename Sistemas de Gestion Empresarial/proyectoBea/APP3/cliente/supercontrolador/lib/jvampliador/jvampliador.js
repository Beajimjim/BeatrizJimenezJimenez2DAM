// Inicialización de variables
let tamanio = 1; // Tamaño inicial del texto
let cantidadcontraste = 1; // Nivel inicial de contraste
let contenedor = document.createElement("div"); // Crear contenedor para los botones
contenedor.classList.add("jvampliador"); // Asignar clase al contenedor
let invertido = false; // Estado inicial de inversión de colores

////////////////// AUMENTAR /////////////////

// Crear botón para aumentar el tamaño del texto
let aumentar = document.createElement("button");
aumentar.textContent = "+"; // Texto del botón
aumentar.setAttribute("aria-label", "Ampliar"); // Accesibilidad: descripción del botón
aumentar.setAttribute("title", "Ampliar el tamaño de la letra"); // Tooltip para el botón

// Añadir el botón al contenedor
contenedor.appendChild(aumentar);

// Evento al hacer clic en el botón de aumentar
aumentar.onclick = function () {
    tamanio *= 1.1; // Incrementar el tamaño en un 10%
    document.querySelector("body").style.fontSize = tamanio + "em"; // Aplicar el nuevo tamaño al cuerpo del documento
};

////////////////// CONTRASTE /////////////////

// Crear botón para ajustar el contraste
let contraste = document.createElement("button");
contraste.textContent = "C"; // Texto del botón
contraste.setAttribute("aria-label", "Contraste"); // Accesibilidad: descripción del botón

// Añadir el botón al contenedor
contenedor.appendChild(contraste);

// Evento al hacer clic en el botón de contraste
contraste.onclick = function () {
    cantidadcontraste = 30; // Ajustar el contraste a un nivel alto (30)
    document.querySelector("body").style.filter = "contrast(" + cantidadcontraste + ")"; // Aplicar el filtro de contraste
};

////////////////// INVERTIR /////////////////

// Crear botón para invertir colores
let invertir = document.createElement("button");
invertir.textContent = "I"; // Texto del botón
invertir.setAttribute("aria-label", "Invertir"); // Accesibilidad: descripción del botón

// Añadir el botón al contenedor
contenedor.appendChild(invertir);

// Evento al hacer clic en el botón de invertir colores
invertir.onclick = function () {
    if (invertido == false) {
        // Si no está invertido, aplicar inversión de colores y rotar tono
        document.querySelector("body").style.filter = "invert(1) hue-rotate(180deg)";
        invertido = true; // Actualizar estado
    } else {
        // Si está invertido, restaurar colores normales
        document.querySelector("body").style.filter = "invert(0) hue-rotate(0deg)";
        invertido = false; // Actualizar estado
    }
};

////////////////// FUENTE /////////////////

// Lista de fuentes disponibles
let fuentes = ['Sans-serif', 'serif', 'personalizada', 'monospace'];
let contador = 0; // Contador para cambiar entre fuentes

// Crear botón para cambiar la fuente
let fuente = document.createElement("button");
fuente.textContent = "F"; // Texto del botón
fuente.setAttribute("aria-label", "Cambiar la fuente"); // Accesibilidad: descripción del botón

// Añadir el botón al contenedor
contenedor.appendChild(fuente);

// Evento al hacer clic en el botón de cambiar fuente
fuente.onclick = function () {
    console.log("ok pulsado"); // Mensaje en consola para depuración
    document.querySelector("body").style.fontFamily = fuentes[contador]; // Aplicar fuente seleccionada
    contador++; // Incrementar contador para la siguiente fuente
    if (contador == 4) {
        contador = 0; // Reiniciar contador si llega al final de la lista
    }
};

////////////////// DISMINUIR /////////////////

// Crear botón para disminuir el tamaño del texto
let disminuir = document.createElement("button");
disminuir.textContent = "-"; // Texto del botón
disminuir.setAttribute("aria-label", "Disminuir el tamaño de la fuente"); // Accesibilidad: descripción del botón

// Añadir el botón al contenedor
contenedor.appendChild(disminuir);

// Evento al hacer clic en el botón de disminuir
disminuir.onclick = function () {
    tamanio *= 0.9; // Reducir el tamaño en un 10%
    document.querySelector("body").style.fontSize = tamanio + "em"; // Aplicar el nuevo tamaño al cuerpo del documento
};

// Añadir el contenedor de botones al cuerpo del documento
document.querySelector("body").appendChild(contenedor);
