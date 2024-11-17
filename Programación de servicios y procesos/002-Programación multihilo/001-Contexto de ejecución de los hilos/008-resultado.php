<?php

	// Abre el archivo 'resultados.txt' en modo "a" (append)
	// El modo "a" permite agregar contenido al final del archivo sin borrar el contenido existente
	$myfile = fopen("resultados.txt", "a");

	// Obtiene el valor del parámetro 'resultado' desde la URL y crea una nueva línea con este valor
	// '\n' añade un salto de línea al final para separar cada resultado
	$txt = $_GET['resultado'] . "\n";

	// Escribe la línea creada en el archivo 'resultados.txt'
	fwrite($myfile, $txt);

	// Cierra el archivo para liberar los recursos del sistema
	fclose($myfile);

?>
