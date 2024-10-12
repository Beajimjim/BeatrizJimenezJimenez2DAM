<?php

// Establezco el nivel de retorno de errores de PHP para facilitar el debugging.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);			

// Me conecto a la base de datos especificando el servidor, usuario, contraseña y nombre de la base de datos.
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");		

// Defino la consulta SQL para seleccionar los campos deseados de la tabla 'aplicaciones' donde 'activa' es igual a 1.
$query = "
    SELECT 
        nombre,
        descripcion,
        icono
    FROM aplicaciones 
    WHERE activa = 1
"; // Esto devuelve solo las aplicaciones que están activas.

// Ejecuto la consulta en la base de datos y guardo el resultado.
$result = mysqli_query($mysqli, $query);				

// Creo un array vacío para almacenar las aplicaciones recuperadas.
$aplicaciones = [];							

// Itero sobre cada fila del resultado de la consulta.
while ($row = mysqli_fetch_assoc($result)) { // Para cada fila que se obtiene...
    $aplicaciones[] = $row; // Añado la fila al array de aplicaciones.
}

// Codifico el array de aplicaciones en formato JSON y lo imprimo como respuesta.
echo json_encode($aplicaciones);
	
?>
