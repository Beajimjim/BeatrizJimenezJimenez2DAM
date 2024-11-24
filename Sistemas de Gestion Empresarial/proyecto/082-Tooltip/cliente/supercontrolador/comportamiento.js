/////////////////////////////////// VARIABLES GLOBALES DEL PROGRAMA /////////////////////////////////////////////

// Variable global para almacenar las columnas de la tabla activa
var columnas_tabla = []; 

/////////////////////////////////// INICIALIZACIÓN DEL PROGRAMA /////////////////////////////////////////////

window.onload = function() {
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    // Llamada a un microservicio para obtener la lista de tablas disponibles en el servidor
    fetch("../../servidor/?o=listatablas")
        .then(response => {
          return response.json(); // Se espera una respuesta en formato JSON
        })
        .then(datos => {
            // Poblamos el menú de navegación con los datos obtenidos del servidor
            poblarMenuNavegacion(datos);
        });
    
    /////////////////////////////////// CARGA DE TABLA POR DEFECTO /////////////////////////////////////////////
    
    // Carga inicial de datos de la tabla "clientes" al arrancar el programa
    cargaDatosTabla("clientes");

    /////////////////////////////////// EVENTOS PARA LA VENTANA MODAL /////////////////////////////////////////////

    // Evento para mostrar la ventana modal al hacer clic en el botón de insertar
    document.querySelector("#insertar").onclick = function() {
        document.querySelector("#modal").style.display = "block"; // Muestra la ventana modal
        document.querySelector("#modal").classList.remove("desaparece"); // Elimina la animación de desaparición
        document.querySelector("#modal").classList.add("aparece"); // Añade la animación de aparición
    };

    // Evento para cerrar la ventana modal al hacer clic fuera del contenido de la ventana
    document.querySelector("#modal").onclick = function() {
        document.querySelector("#modal").classList.remove("aparece"); // Elimina la animación de aparición
        document.querySelector("#modal").classList.add("desaparece"); // Añade la animación de desaparición
        
        // Después de 1 segundo (tiempo de la animación), oculta la ventana modal
        setTimeout(function() {
            document.querySelector("#modal").style.display = "none";
        }, 1000);
    };

    // Evita que el clic dentro del contenido de la ventana modal cierre la ventana
    document.querySelector("#contienemodal").onclick = function(event) {
        event.stopPropagation(); // Detiene la propagación del evento al elemento padre
    };
};



// Explicación de las secciones del código
// Variables globales:

// Se define columnas_tabla como un arreglo global para almacenar las columnas de la tabla activa.
// Inicialización (window.onload):

// La función principal se ejecuta una vez que la página web se ha cargado completamente.
// Listado de tablas:

// Usa fetch para obtener la lista de tablas del servidor.
// Los datos se procesan como JSON y se pasan a la función poblarMenuNavegacion para llenar el menú de navegación.
// Carga de tabla por defecto:

// Al iniciar el programa, se llama a cargaDatosTabla("clientes") para cargar los datos de la tabla "clientes" como predeterminada.
// Ventana modal (para insertar datos):

// Abrir modal: Cuando se hace clic en el botón con ID insertar, se muestra la ventana modal con una animación de aparición.
// Cerrar modal: Al hacer clic fuera del contenido del modal, se activa una animación de desaparición, y después de un segundo, el modal se oculta.
// Detener propagación: Si se hace clic dentro del contenido del modal (#contienemodal), el evento no se propaga, evitando que se cierre el modal accidentalmente.