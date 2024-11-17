<?php
    // Nombre del archivo que contiene la lista de tareas
    $file = 'tareas.txt';

    // Lee el contenido del archivo y guarda cada línea como un elemento de un array
    // 'file($file)' devuelve un array donde cada elemento es una línea del archivo
    $lines = file($file);

    // Guarda la primera tarea (la primera línea del archivo) en la variable $tarea
    $tarea = $lines[0];

    // Muestra la primera tarea al cliente (JavaScript recibirá este dato)
    echo $lines[0];

    // Elimina la primera línea del array (la tarea asignada)
    array_shift($lines);

    // Sobrescribe el archivo 'tareas.txt' con las líneas restantes
    // 'implode("", $lines)' convierte el array en una cadena de texto
    file_put_contents($file, implode('', $lines));

    // Abre el archivo 'asignaciones.txt' en modo "a" (append) para agregar contenido al final
    $myfile = fopen("asignaciones.txt", "a");

    // Crea un texto de registro con el nombre del usuario y la tarea asignada
    // El nombre del usuario se obtiene del parámetro 'usuario' pasado en la URL
    $txt = "Al usuario " . $_GET['usuario'] . " le ha tocado la tarea: " . $tarea . "\n";

    // Escribe el registro en el archivo 'asignaciones.txt'
    fwrite($myfile, $txt);

    // Cierra el archivo 'asignaciones.txt' para liberar los recursos del sistema
    fclose($myfile);
?>
