/////////////////////////////////// VARIABLES GLOBALES DEL PROGRAMA /////////////////////////////////////////////

var columnas_tabla = []; // Variable global para almacenar las columnas de la tabla

/////////////////////////////////// INICIO DEL PROGRAMA /////////////////////////////////////////////

window.onload = function() {
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    // Realizar una petición al servidor para obtener la lista de tablas de la base de datos relacional
    fetch("../../servidor/?o=listatablas")
        .then(response => {
            // Convertir la respuesta en formato JSON
            return response.json();
        })
        .then(datos => {
            // Mostrar los datos obtenidos en la consola (para depuración)
            console.log(datos);
            // Llamar a la función para poblar el menú de navegación con la lista de tablas
            poblarMenuNavegacion(datos, "tabla");
        });
    
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    /////////////////////////////////// LISTADO DE COLECCIONES DE MONGO /////////////////////////////////////////////
    
    // Realizar una petición al servidor para obtener la lista de colecciones de MongoDB
    fetch("../../servidor/?o=listacolecciones")
        .then(response => {
            // Convertir la respuesta en formato JSON
            return response.json();
        })
        .then(datos => {
            // Mostrar un mensaje y los datos obtenidos en la consola (para depuración)
            console.log("Vamos con las colecciones");
            console.log(datos);
            // Llamar a la función para poblar el menú de navegación con la lista de colecciones
            poblarMenuNavegacion(datos, "coleccion");
        });
    
    /////////////////////////////////// LISTADO DE COLECCIONES DE MONGO /////////////////////////////////////////////
     
    // Cargar los datos de la tabla "clientes" por defecto al iniciar la aplicación
    cargaDatosTabla("clientes");

    /////////////////////////////////// CLICK EN VENTANA MODAL PARA INSERTAR /////////////////////////////////////////////
    
    // Mostrar el modal para insertar datos cuando se hace clic en el botón con ID "insertar"
    document.querySelector("#insertar").onclick = function() {
        // Mostrar el modal y aplicar la animación de aparición
        document.querySelector("#modal").style.display = "block";
        document.querySelector("#modal").classList.remove("desaparece");
        document.querySelector("#modal").classList.add("aparece");
    };

    // Ocultar el modal cuando se hace clic fuera del contenido del modal
    document.querySelector("#modal").onclick = function() {
        // Aplicar la animación de desaparición
        document.querySelector("#modal").classList.remove("aparece");
        document.querySelector("#modal").classList.add("desaparece");
        
        // Después de 1 segundo, ocultar el modal completamente
        setTimeout(function() {
            document.querySelector("#modal").style.display = "none";
        }, 1000);
    };

    // Evitar que el clic dentro del contenido del modal cierre el modal
    document.querySelector("#contienemodal").onclick = function(event) {
        event.stopPropagation();
    };
};
