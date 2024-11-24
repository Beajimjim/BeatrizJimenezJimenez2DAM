<?php

// Habilita el reporte de errores para que se muestren errores y excepciones
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Establezco el nivel de retorno de errores de PHP

// Conexión a la base de datos usando mysqli
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa"); // Me conecto a la base de datos

// Definición de la consulta SQL para seleccionar aplicaciones activas
$query = "
    SELECT 
        nombre,
        descripcion,
        icono
    FROM aplicaciones 
    WHERE activa = 1
"; // Selecciono el nombre, descripción e ícono de las aplicaciones que están activas

// Ejecuto la consulta en la base de datos
$result = mysqli_query($mysqli, $query); // Ejecuto la petición contra la base de datos

// Inicializo un array vacío para almacenar las aplicaciones
$aplicaciones = []; // Creo un array vacio

// Procesa cada fila del resultado de la consulta
while ($row = mysqli_fetch_assoc($result)) { // Mientras haya filas que procesar
    $aplicaciones[] = $row; // Añado nueva aplicación al array
}

// Convierte el array de aplicaciones a formato JSON y lo imprime
echo json_encode($aplicaciones); // Devuelvo el array de aplicaciones como JSON

?>
