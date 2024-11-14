<?php
    // Establezco el nivel de retorno de errores de PHP para que se lancen excepciones en caso de error.
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
    // Me conecto a la base de datos utilizando el host, usuario, contraseña y nombre de la base de datos.
	$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");
	
    // Defino la consulta SQL para mostrar todas las tablas en la base de datos.
	$query = "
		SHOW TABLES;
	"; // Esta consulta recupera la lista de todas las tablas presentes en la base de datos actual.

    // Ejecuto la consulta contra la base de datos y almaceno el resultado.
	$result = mysqli_query($mysqli, $query);
	
    // Creo un array vacío para almacenar los nombres de las tablas.
	$aplicaciones = [];

    // Itero sobre cada fila del resultado de la consulta.
	while ($row = mysqli_fetch_assoc($result)) {
		// Añado cada fila de tabla al array de aplicaciones.
		$aplicaciones[] = $row;
	}

    // Devuelvo el array de tablas en formato JSON.
	echo json_encode($aplicaciones);
?>
