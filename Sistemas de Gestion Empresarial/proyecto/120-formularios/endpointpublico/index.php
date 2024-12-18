<?php
// Configuración de cabeceras para permitir solicitudes CORS (Cross-Origin Resource Sharing)
header("Access-Control-Allow-Origin: *"); // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Especifica los métodos HTTP permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Especifica los encabezados permitidos en las solicitudes
?>

<?php
// Configuración de errores
ini_set('display_errors', 1); // Activa la visualización de errores
ini_set('display_startup_errors', 1); // Activa los errores durante la fase de inicio del script
error_reporting(E_ALL); // Configura para que se muestren todos los errores

// Conexión a la base de datos MySQL
$mysqli = mysqli_connect("localhost", "crimsonleer", "crimsonleer", "crimson"); // Conexión con credenciales

// Consulta SQL para obtener todos los registros de la tabla 'productos'
$peticion = "SELECT * FROM productos"; 

// Ejecución de la consulta y almacenamiento del resultado
$resultado = mysqli_query($mysqli, $peticion);

// Preparación de los datos en formato JSON
$json = []; // Inicializa un array vacío para almacenar los resultados
while ($fila = mysqli_fetch_assoc($resultado)) { // Recorre cada fila del resultado de la consulta
    $json[] = $fila; // Agrega la fila actual al array `$json`
}
$json = json_encode($json, JSON_PRETTY_PRINT); // Convierte el array `$json` en una cadena JSON con formato legible
echo $json; // Devuelve el JSON como respuesta de la API
?>
