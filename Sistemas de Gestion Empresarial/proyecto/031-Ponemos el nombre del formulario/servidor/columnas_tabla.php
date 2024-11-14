<?php
    // Verifico si se ha pasado el parámetro 'tabla' en la URL
	if(!isset($_GET['tabla'])) {
		$tabla = "clientes"; // Si no se pasa, establezco 'clientes' como tabla por defecto
	} else {
		$tabla = $_GET['tabla']; // Si se pasa, guardo el nombre de la tabla desde la solicitud
	}

    // Establezco el nivel de retorno de errores de PHP
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

    // Me conecto a la base de datos utilizando mysqli
	$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");

    // Creo la consulta SQL para mostrar las columnas de la tabla seleccionada
	$query = "
		SHOW COLUMNS in " . $tabla . "; 
	";									

    // Ejecuto la consulta contra la base de datos
	$result = mysqli_query($mysqli, $query);

    // Creo un array vacío para almacenar los resultados
	$aplicaciones = [];

    // Recorro los resultados de la consulta
	while ($row = mysqli_fetch_assoc($result)) {
		// Añado cada fila de resultados al array
		$aplicaciones[] = $row;
	}

    // Devuelvo el array de resultados como un JSON
	echo json_encode($aplicaciones);
?>