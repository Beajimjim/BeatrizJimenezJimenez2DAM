<?php
    // Establezco el nivel de retorno de errores de PHP para que se lancen excepciones en caso de error.
	mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
	
    // Me conecto a la base de datos utilizando el host, usuario, contraseña y nombre de la base de datos.
	$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");
	
    // Defino la consulta SQL para seleccionar el usuario que coincida con el nombre y contraseña enviados.
	$query = "
		SELECT                                             
		usuario
		FROM usuarios 
		WHERE usuario = '".$_GET['usuario']."' 
		AND password = '".$_GET['password']."'
	"; // Esta consulta busca un usuario en la tabla de usuarios que tenga el nombre y contraseña proporcionados.

    // Ejecuto la consulta contra la base de datos y almaceno el resultado.
	$result = mysqli_query($mysqli, $query);
	
    // Compruebo si se obtuvo alguna fila de resultados.
	if ($row = mysqli_fetch_assoc($result)) {
		// Si existe, añado una propiedad 'resultado' y le asigno el valor 'ok'.
		$row['resultado'] = 'ok';
		
	    // Devuelvo el usuario encontrado en formato JSON.
	    echo json_encode($row);
	} else { // En caso de que no exista el usuario
		// Devuelvo un JSON indicando que el resultado es 'ko'.
		echo '{"Resultado:":"ko"}';
	}
?>
