<?php
// Configurar encabezados para permitir solicitudes CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Especificar los métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Especificar las cabeceras permitidas en las solicitudes
?>

<?php
// Configuración de errores para depuración
ini_set('display_errors', 1); // Mostrar errores en pantalla
ini_set('display_startup_errors', 1); // Mostrar errores durante el inicio del script
error_reporting(E_ALL); // Reportar todos los niveles de errores (advertencias, errores fatales, etc.)

// Establecer conexión con la base de datos MySQL
$mysqli = mysqli_connect("localhost", "crimson", "crimson", "crimson");
// La conexión utiliza:
// - Host: "localhost"
// - Usuario: "crimsonleer"
// - Contraseña: "crimsonleer"
// - Base de datos: "crimson"
// Nota: No se maneja error en la conexión, lo que podría generar problemas si esta falla.

// Definir la consulta SQL que se ejecutará
$peticion = "SELECT * FROM productos"; // Obtener todos los registros de la tabla "productos"

// Ejecutar la consulta en la base de datos
$resultado = mysqli_query($mysqli, $peticion);
// La función `mysqli_query` devuelve un objeto de resultados si la consulta es exitosa,
// o `false` si ocurre un error. En este caso, no se maneja el error explícitamente.

// Crear un array para almacenar los resultados
$json = [];
while ($fila = mysqli_fetch_assoc($resultado)) {
    // Iterar sobre cada fila de resultados y agregarla al array `$json`
    $json[] = $fila;
}

// Convertir el array de PHP en formato JSON
$json = json_encode($json, JSON_PRETTY_PRINT);
// La opción `JSON_PRETTY_PRINT` agrega formato legible con indentaciones y saltos de línea.

// Enviar el JSON como respuesta al cliente
echo $json;
// Esto imprime el JSON generado, que será devuelto como respuesta al cliente que hizo la solicitud.

?>
