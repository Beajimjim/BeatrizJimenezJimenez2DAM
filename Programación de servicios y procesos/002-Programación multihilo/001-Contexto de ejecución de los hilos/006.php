<?php
    // Nombre del archivo donde se almacenan las tareas
    $file = 'tareas.txt';

    // Lee el contenido del archivo y lo guarda en un array, donde cada línea del archivo es un elemento del array
    // 'file($file)' devuelve un array donde cada elemento es una línea del archivo
    $lines = file($file);

    // Asigna la primera línea del archivo a la variable $tarea
    $tarea = $lines[0];

    // Muestra la primera línea del archivo al cliente (la tarea asignada)
    echo $lines[0];

    // Elimina la primera línea del array usando 'array_shift'
    // 'array_shift($lines)' elimina el primer elemento del array y reordena los índices
    array_shift($lines);

    // Guarda las líneas restantes en el archivo 'tareas.txt'
    // 'implode("", $lines)' convierte el array de vuelta a una cadena de texto
    // 'file_put_contents($file, ...)' sobrescribe el archivo con el contenido actualizado
    file_put_contents($file, implode('', $lines));

    // Abre el archivo 'asignaciones.txt' en modo "a" (append) para agregar contenido al final del archivo sin borrar lo existente
    $myfile = fopen("asignaciones.txt", "a");

    // Crea el texto que se va a registrar, incluyendo el nombre del usuario y la tarea asignada
    // El nombre del usuario se obtiene del parámetro 'usuario' pasado en la URL
    $txt = "Al usuario " . $_GET['usuario'] . " le ha tocado la tarea: " . $tarea . "\n";

    // Escribe el texto generado en el archivo 'asignaciones.txt'
    fwrite($myfile, $txt);

    // Cierra el archivo 'asignaciones.txt' para liberar los recursos del sistema
    fclose($myfile);
?>
