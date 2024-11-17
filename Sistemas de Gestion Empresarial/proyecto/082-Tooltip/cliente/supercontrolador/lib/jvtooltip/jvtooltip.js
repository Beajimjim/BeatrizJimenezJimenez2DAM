// Crear un elemento div para el tooltip y asignarle la clase "jvtooltip"
let jvtooltip = document.createElement("div");
jvtooltip.classList.add("jvtooltip");

// Añadir el tooltip al cuerpo del documento
document.querySelector("body").appendChild(jvtooltip);

// Función para actualizar la posición del tooltip cuando el mouse se mueve
document.onmousemove = function(e) {
    // Ajustar la posición del tooltip en función de la posición del mouse
    jvtooltip.style.left = e.pageX + "px";
    jvtooltip.style.top = e.pageY + "px";
};

// Función para manejar el evento "mouseover" en el documento
document.onmouseover = function(event) {
    // Obtener el elemento sobre el que se encuentra el mouse
    const element = event.target;

    // Verificar si el elemento tiene el atributo "jvtooltip"
    if (element.hasAttribute("jvtooltip")) {
        // Mostrar el tooltip y actualizar su contenido
        jvtooltip.style.display = "block";
        jvtooltip.textContent = element.getAttribute("jvtooltip");
    } else {
        // Ocultar el tooltip si el elemento no tiene el atributo "jvtooltip"
        jvtooltip.style.display = "none";
    }
};
