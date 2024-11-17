<?php
	// Abre el archivo "usuarios.txt" en modo "a" (append)
	// El modo "a" permite agregar contenido al final del archivo sin eliminar lo que ya estaba escrito
	$myfile = fopen("user.txt", "a");

	// Obtiene el parámetro 'usuario' de la URL usando el método GET
	// Almacena el valor en la variable $txt y añade un salto de línea "\n" para separar cada entrada
	$txt = $_GET['usuario'] . "\n";

	// Escribe el texto ($txt) en el archivo abierto ($myfile)
	fwrite($myfile, $txt);

	// Cierra el archivo para liberar los recursos del sistema
	fclose($myfile);
?>