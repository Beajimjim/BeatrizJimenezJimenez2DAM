<?php
    // Nombre del archivo donde se almacenan las tareas
    $file = 'tareas.txt';

    // Lee el archivo y guarda cada línea como un elemento de un array
    // 'file($file)' devuelve un array donde cada elemento es una línea del archivo
    $lines = file($file);

    // Asigna la primera línea del archivo a la variable $tarea
    $tarea = $lines[0];

    // Muestra la primera línea del archivo al cliente
    echo $lines[0];

    // Elimina la primera línea del array usando 'array_shift'
    // 'array_shift($lines)' elimina el primer elemento del array y ajusta los índices
    array_shift($lines);

    // Guarda las líneas restantes de vuelta en el archivo
    // 'implode("", $lines)' convierte el array en una cadena de texto
    // 'file_put_contents($file, ...)' sobrescribe el archivo con el contenido actualizado
    file_put_contents($file, implode('', $lines));

    // Abre el archivo 'asignaciones.txt' en modo "a" (append) para agregar contenido sin borrar lo existente
    $myfile = fopen("asignaciones.txt", "a");

    // Obtiene el nombre del usuario desde el parámetro GET y crea el texto a guardar
    // La cadena incluye el nombre del usuario y la tarea asignada
    $txt = "Al usuario " . $_GET['usuario'] . " le ha tocado la tarea: " . $tarea . "\n";

    // Escribe el texto generado en el archivo 'asignaciones.txt'
    fwrite($myfile, $txt);

    // Cierra el archivo 'asignaciones.txt' para liberar los recursos del sistema
    fclose($myfile);
?>
