<?php
    // Define el nombre del archivo donde se almacenan las tareas
    $file = 'tareas.txt';

    // Lee el contenido del archivo y lo guarda en un array, donde cada línea es un elemento del array
    // 'file($file)' devuelve un array donde cada elemento es una línea del archivo
    $lines = file($file);

    // Muestra la primera línea del archivo al cliente
    // '$lines[0]' es el primer elemento del array, es decir, la primera línea del archivo
    echo $lines[0];

    // Elimina la primera línea del array usando 'array_shift'
    // 'array_shift($lines)' elimina el primer elemento del array y reordena los índices
    array_shift($lines);

    // Guarda las líneas restantes de vuelta en el archivo
    // 'implode("", $lines)' convierte el array en una cadena de texto, uniendo las líneas sin separadores adicionales
    // 'file_put_contents($file, ...)' sobrescribe el archivo con el contenido actualizado
    file_put_contents($file, implode('', $lines));
?>
