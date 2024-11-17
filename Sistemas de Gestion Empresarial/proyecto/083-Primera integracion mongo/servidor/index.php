<?php

// Configuración para mostrar errores en pantalla
ini_set('display_errors', 1);                        // Activar la visualización de errores
ini_set('display_startup_errors', 1);                // Activar la visualización de errores al iniciar
error_reporting(E_ALL);                              // Reportar todos los errores (E_ALL muestra todos los errores posibles)

// Incluir archivos con las clases necesarias
include "ConexionDB.php";                            // Incluye la clase para la conexión con base de datos relacional
include "ConectaMongo.php";                          // Incluye la clase para la conexión con MongoDB

// Crear instancias de las clases de conexión
$conexion = new conexionDB();                        // Instancia de la clase para base de datos relacional
$conexionmongo = new ConectaMongo();                 // Instancia de la clase para base de datos MongoDB

// Verificar si se ha recibido un parámetro 'o' en la solicitud (indica la operación a realizar)
if (isset($_GET['o'])) {
    // Evaluar el valor del parámetro 'o' para determinar la operación
    switch ($_GET['o']) {
        // Listar tablas de la base de datos relacional
        case "listatablas":
            echo $conexion->listadoTablas();         // Llama al método para listar tablas
            break;

        // Listar colecciones de MongoDB
        case "listacolecciones":
            echo $conexionmongo->listarColecciones(); // Llama al método para listar colecciones en MongoDB
            break;

        // Seleccionar una tabla específica
        case "tabla":
            echo $conexion->seleccionaTabla($_GET['tabla']); // Llama al método para seleccionar datos de una tabla
            break;

        // Listar columnas de una tabla específica
        case "columnastabla":
            echo $conexion->columnasTabla($_GET['tabla']);   // Llama al método para listar columnas de una tabla
            break;

        // Eliminar un registro de una tabla específica
        case "eliminar":
            echo $conexion->eliminaTabla($_GET['tabla'], $_GET['id']); // Llama al método para eliminar un registro por ID
            break;

        // Buscar registros en una tabla con datos proporcionados en JSON
        case "buscar":
            $json = file_get_contents('php://input');         // Obtiene el JSON de la petición del cliente
            $datos = json_decode($json, true);                // Decodifica el JSON a un array asociativo
            echo $conexion->buscar($_GET['tabla'], $datos);   // Llama al método para realizar la búsqueda
            break;

        // Actualizar un registro con datos proporcionados en JSON
        case "actualizar":
            $json = file_get_contents('php://input');         // Obtiene el JSON de la petición del cliente
            $datos = json_decode($json, true);                // Decodifica el JSON a un array asociativo
            echo $conexion->actualizar($datos);               // Llama al método para actualizar el registro
            break;

        // Buscar registros similares en una tabla
        case "buscarSimilar":
            $json = file_get_contents('php://input');         // Obtiene el JSON de la petición del cliente
            $datos = json_decode($json, true);                // Decodifica el JSON a un array asociativo
            echo $conexion->buscarSimilar($_GET['tabla'], $datos); // Llama al método para realizar búsqueda similar
            break;

        // Insertar un nuevo registro en una tabla
        case "insertar":
            $json = file_get_contents('php://input');         // Obtiene el JSON de la petición del cliente
            $datos = json_decode($json, true);                // Decodifica el JSON a un array asociativo
            echo $conexion->insertaTabla($_GET['tabla'], $datos); // Llama al método para insertar un nuevo registro
            break;
    }
}

?>
