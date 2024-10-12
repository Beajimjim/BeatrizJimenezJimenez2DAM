<?php
    // Configura el reporte de errores de mysqli para que lance excepciones en caso de error.
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
    // Establezco conexión a la base de datos con el host, usuario, contraseña y nombre de la base de datos.
	$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");
	
    // Defino la consulta SQL para seleccionar el nombre, descripción e ícono de las aplicaciones activas.
	$query = "
		SELECT 
			nombre,
			descripcion,
			icono
		FROM aplicaciones 
		WHERE activa = 1
	";

    // Ejecuto la consulta en la base de datos.
	$result = mysqli_query($mysqli, $query);
	
    // Creo un array vacío para almacenar las aplicaciones.
	$aplicaciones = [];
	
    // Itero sobre los resultados de la consulta.
	while ($row = mysqli_fetch_assoc($result)) {
		// Agrego cada fila de resultados al array de aplicaciones.
		$aplicaciones[] = $row;
	}
	
    // Devuelvo el array de aplicaciones en formato JSON.
	echo json_encode($aplicaciones);
?>
