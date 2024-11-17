<?php
	///////////////////// TAREAS /////////////////////////////////////////////////
	
    	$file = 'tareas.txt';				// Define el archivo de tareas que se va a utilizar

    	$lines = file($file);				// Lee el contenido del archivo y lo guarda en un array, donde cada línea es un elemento del array
		$tarea = $lines[0];				// Guarda la primera tarea (primera línea del archivo) en la variable $tarea
    	echo $lines[0];					// Muestra la primera tarea al cliente (JavaScript la recibe)

    	array_shift($lines);				// Elimina la primera línea del array (la tarea que ya se asignó)

    	// Sobrescribe el archivo 'tareas.txt' con las líneas restantes
    	// 'implode("", $lines)' convierte el array a una cadena de texto, uniendo todas las líneas
    	file_put_contents($file, implode('', $lines));
    	
    	///////////////////// ASIGNACIONES /////////////////////////////////////////////////
    	
    	$myfile = fopen("asignaciones.txt", "a");	// Abre el archivo 'asignaciones.txt' en modo "a" (append) para agregar contenido sin borrar lo existente
	$txt = "Al usuario " . $_GET['usuario'] . " le ha tocado la tarea: " . $tarea . "\n";	// Crea un texto con el nombre del usuario y la tarea asignada
	fwrite($myfile, $txt);				// Escribe el texto en el archivo 'asignaciones.txt'
	fclose($myfile);				// Cierra el archivo para liberar los recursos del sistema

?>
