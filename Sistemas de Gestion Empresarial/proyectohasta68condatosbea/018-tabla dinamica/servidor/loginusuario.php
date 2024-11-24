<?php
    // Establezco el nivel de retorno de errores de PHP para que se lancen excepciones en caso de error.
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
    // Me conecto a la base de datos utilizando el host, usuario, contraseña y nombre de la base de datos.
	$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");
	
    // Defino la consulta SQL para seleccionar el usuario que coincide con el nombre de usuario y la contraseña proporcionados.
	$query = "
		SELECT                                             
		usuario
		FROM usuarios 
		WHERE usuario = '".$_GET['usuario']."' 
		AND contrasena = '".$_GET['contrasena']."'
	"; // Esta consulta comprueba si el usuario enviado existe en la base de datos.

    // Ejecuto la consulta contra la base de datos y almaceno el resultado.
	$result = mysqli_query($mysqli, $query);
	
    // Verifico si se encontró algún resultado en la consulta.
	if ($row = mysqli_fetch_assoc($result)) {
		// Si el usuario existe, añado una propiedad 'resultado' y le asigno el valor 'ok'.
		$row['resultado'] = 'ok';
		
		// Devuelvo el resultado en formato JSON, que incluye el nombre de usuario y el estado.
	    echo json_encode($row);
	} else {
		// Si no se encuentra el usuario, devuelvo un JSON indicando que el resultado es 'ko'.
		echo '{"Resultado:":"ko"}';
	}
?>
