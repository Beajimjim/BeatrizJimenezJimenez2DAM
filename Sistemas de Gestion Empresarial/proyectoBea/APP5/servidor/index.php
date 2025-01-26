<?php

// Configuración para mostrar errores durante el desarrollo
ini_set('display_errors', 1); // Activar la visualización de errores
ini_set('display_startup_errors', 1); // Activar errores al iniciar el script
error_reporting(E_ALL); // Mostrar todos los tipos de errores

// Incluir el archivo que contiene la clase conexionDB
include "ConexionDB.php";

// Crear una instancia de la clase conexionDB para manejar la base de datos
$conexion = new conexionDB();

// Verificar si existe un parámetro `o` en la URL
if (isset($_GET['o'])) {
    // Usar una estructura switch para manejar diferentes operaciones basadas en el valor de `o`
    switch ($_GET['o']) {
        case "compruebatoken":
			//echo $_GET['token'];
			if(is_numeric(base64_decode($_GET['token']))){
				if(
					(abs(base64_decode($_GET['token']) - date('U')) < 3600)
				){
					echo '{"resultado":"ok"}';
				}else{
					echo '{"resultado":"ko"}';
				}
				}else{
					echo '{"resultado":"ko"}';	
				}
				break;
        case "listadoaplicacionesusuario":
            echo $conexion->listadoAplicacionesUsuario($_GET['usuario']);																						// Llamo a un metodo
            break;
        case "listatablas":
            // Llamar al método `listadoTablas` para obtener una lista de tablas
            echo $conexion->listadoTablas();
            break;
        case "listatablasaplicacion":
            echo $conexion->listadoTablasAplicacion($_GET['aplicacion']);																						// Llamo a un metodo
            break;    
        case "estadisticastablas":
            echo $conexion->contarFilasTablas();																// Llamo a un metodo
            break;
        case "tabla":
            // Llamar al método `seleccionaTabla` para obtener los datos de una tabla específica
            echo $conexion->seleccionaTabla($_GET['tabla']);
            break;

        case "columnastabla":
            // Llamar al método `columnasTabla` para obtener las columnas de una tabla específica
            echo $conexion->columnasTabla($_GET['tabla']);
            break;

        case "eliminar":
            // Llamar al método `eliminaTabla` para eliminar un registro de una tabla específica
            echo $conexion->eliminaTabla($_GET['tabla'], $_GET['id']);
            break;

        case "buscar":
            // Leer los datos enviados en el cuerpo de la solicitud como JSON
            $json = file_get_contents('php://input');
            // Convertir el JSON recibido en un array asociativo para PHP
            $datos = json_decode($json, true);
            // Llamar al método `buscar` para buscar registros exactos en una tabla
            echo $conexion->buscar($_GET['tabla'], $datos);
            break;

        case "actualizar":
            // Leer los datos enviados en el cuerpo de la solicitud como JSON
            $json = file_get_contents('php://input');
            // Convertir el JSON recibido en un array asociativo para PHP
            $datos = json_decode($json, true);
            // Llamar al método `actualizar` para actualizar un registro específico en la base de datos
            echo $conexion->actualizar($datos);
            break;

        case "buscarSimilar":
            // Leer los datos enviados en el cuerpo de la solicitud como JSON
            $json = file_get_contents('php://input');
            // Convertir el JSON recibido en un array asociativo para PHP
            $datos = json_decode($json, true);
            // Llamar al método `buscarSimilar` para realizar búsquedas con similitudes en una tabla
            echo $conexion->buscarSimilar($_GET['tabla'], $datos);
            break;

        case "insertar":
            // Leer los datos enviados en el cuerpo de la solicitud como JSON
            $json = file_get_contents('php://input');
            // Convertir el JSON recibido en un array asociativo para PHP
            $datos = json_decode($json, true);
            // Llamar al método `insertaTabla` para insertar un nuevo registro en una tabla
            echo $conexion->insertaTabla($_GET['tabla'], $datos);
            break;

        case "informe":
            $misdatos = $conexion->obtenRegistro($_GET['tabla'],$_GET['id']); // Obtiene los datos de la tabla
                $misdatos = json_decode($misdatos, true); // Decodifica el JSON en un array asociativo

                if (!is_array($misdatos)) {
                    echo json_encode(["error" => "Datos no válidos recibidos de seleccionaTabla."]);
                    break;                }
            
                echo json_encode($misdatos, JSON_PRETTY_PRINT);
            break;
        
    }
}
/*  Explicación de las partes principales
Configuración de errores:

Se activa la visualización de errores para facilitar el desarrollo y depuración.
Inclusión de la clase conexionDB:

Se importa el archivo que contiene la clase para gestionar las operaciones de base de datos.
Instancia de la conexión:

Se crea un objeto $conexion para interactuar con la base de datos mediante los métodos definidos en la clase.
Validación del parámetro o:

Si el parámetro o está definido en la URL, se ejecuta el bloque switch.
Operaciones basadas en el valor de o:

listatablas: Obtiene una lista de tablas en la base de datos.
tabla: Obtiene los registros de una tabla específica.
columnastabla: Obtiene las columnas de una tabla específica.
eliminar: Elimina un registro de una tabla usando el identificador.
buscar: Realiza una búsqueda exacta en una tabla con los parámetros enviados en el cuerpo de la solicitud.
actualizar: Actualiza un registro en la base de datos con los datos enviados.
buscarSimilar: Realiza búsquedas con similitudes en los datos de una tabla.
insertar: Inserta un nuevo registro en la tabla con los datos enviados.
Procesamiento de datos JSON:

Las operaciones que reciben datos desde el cliente en formato JSON (buscar, actualizar, buscarSimilar, insertar) los decodifican en un formato entendible por PHP (json_decode).
Propósito del código
Este script actúa como un controlador para un sistema de gestión de base de datos, proporcionando un punto de entrada para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y otras consultas específicas.
 Es flexible y se comunica con el cliente mediante solicitudes HTTP con datos en formato JSON. */
?>