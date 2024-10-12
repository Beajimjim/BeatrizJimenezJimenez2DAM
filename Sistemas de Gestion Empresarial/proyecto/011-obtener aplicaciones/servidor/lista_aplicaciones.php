<?php

// Habilita el informe de errores para la conexión a la base de datos, lanzando excepciones en caso de errores.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Se establece la conexión a la base de datos con el servidor, usuario, contraseña y nombre de la base de datos.
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");

// Se construye una consulta SQL para seleccionar el nombre, descripción e icono de las aplicaciones activas.
$query = "
    SELECT 
        nombre,
        descripcion,
        icono
    FROM aplicaciones 
    WHERE activa = 1
"; // Se obtienen solo las aplicaciones que están marcadas como activas.


// Se ejecuta la consulta contra la base de datos.
$result = mysqli_query($mysqli, $query);

// Se crea un array vacío para almacenar las aplicaciones obtenidas.
$aplicaciones = [];

// Se itera sobre cada fila del resultado de la consulta.
while ($row = mysqli_fetch_assoc($result)) { // Si hay resultados disponibles
    $aplicaciones[] = $row; // Se añade cada aplicación al array 'aplicaciones'.
}

// Se convierte el array de aplicaciones a formato JSON y se envía como respuesta al cliente.
echo json_encode($aplicaciones);

?>
