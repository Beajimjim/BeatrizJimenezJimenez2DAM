<?php
// Habilitar la visualización de errores para depuración (desactivar en producción)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Establecer el encabezado para devolver una respuesta en formato JSON
header('Content-Type: application/json');

// Configuración de conexión a la base de datos MySQL
$host = "217.154.4.86";  // Dirección del servidor MySQL, usar "127.0.0.1" si es local
$user = "trespalabras";  // Usuario de la base de datos
$pass = "trespalabras";  // Contraseña del usuario
$dbname = "trespalabras"; // Nombre de la base de datos

// Crear la conexión con MySQL usando la clase mysqli
$conn = new mysqli($host, $user, $pass, $dbname);

// Verificar si la conexión falló
if ($conn->connect_error) {
    // Enviar un mensaje de error en formato JSON y finalizar el script
    echo json_encode(["error" => "Error de conexión a MySQL: " . $conn->connect_error]);
    exit();
}

// Verificar si se recibió un parámetro 'entrada' en la URL
if (!isset($_GET['entrada']) || empty(trim($_GET['entrada']))) {
    // Enviar un mensaje de error si no se recibió una entrada válida
    echo json_encode(["error" => "No se recibió ningún input válido."]);
    exit();
}

// Obtener el valor del parámetro de entrada y eliminar espacios innecesarios
$input = trim($_GET['entrada']);

// Definir la consulta SQL usando un "Prepared Statement" para evitar inyección SQL
$query = "SELECT siguiente FROM palabras WHERE previas LIKE ? LIMIT 5";

// Preparar la consulta en el servidor MySQL
$stmt = $conn->prepare($query);

// Agregar comodines "%" al término de búsqueda para que funcione con LIKE en SQL
$searchTerm = "%" . $input . "%";

// Asociar el parámetro de búsqueda con la consulta preparada
$stmt->bind_param("s", $searchTerm);

// Ejecutar la consulta en la base de datos
$stmt->execute();

// Obtener los resultados de la consulta
$result = $stmt->get_result();

// Inicializar un array para almacenar las predicciones
$predicciones = [];

// Recorrer los resultados y agregar las palabras encontradas al array
while ($row = $result->fetch_assoc()) {
    $predicciones[] = $row['siguiente'];
}

// Cerrar la consulta preparada
$stmt->close();

// Cerrar la conexión con la base de datos
$conn->close();

// Enviar la respuesta en formato JSON con las predicciones obtenidas
echo json_encode(["predicciones" => $predicciones]);
?>
