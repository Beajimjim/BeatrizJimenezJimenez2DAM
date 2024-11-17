<?php
// archivo: registro.php

// Obtener el nombre del usuario desde la URL (usando el parámetro 'usuario')
$usuario = $_GET['usuario'] ?? '';

// Verificar si se ha proporcionado un nombre de usuario
if ($usuario !== '') {
    // Nombres de los archivos donde se guardan las asignaciones y tareas
    $archivoAsignaciones = 'asignaciones.txt';
    $archivoTareas = 'tareas.txt';

    // Leer el contenido de los archivos de asignaciones y tareas
    $asignaciones = file_exists($archivoAsignaciones) ? file($archivoAsignaciones, FILE_IGNORE_NEW_LINES) : [];
    $tareas = file_exists($archivoTareas) ? file($archivoTareas, FILE_IGNORE_NEW_LINES) : [];

    // Verificar si el usuario ya está registrado
    foreach ($asignaciones as $linea) {
        // Comprobar si la línea empieza con el nombre del usuario seguido de ":"
        if (strpos($linea, $usuario . ":") === 0) {
            // Si el usuario ya está registrado, mostrar un mensaje y salir
            echo "Usuario ya registrado";
            exit;
        }
    }

    // Asignar un conjunto de tareas al usuario
    // El índice de la tarea se calcula según el número de asignaciones existentes
    $indiceTarea = count($asignaciones) % count($tareas);
    $tareasAsignadas = json_decode($tareas[$indiceTarea]);

    // Crear la línea de asignación en formato "usuario:[tarea1,tarea2,tarea3]"
    $lineaAsignacion = $usuario . ":[" . implode(",", $tareasAsignadas) . "]";

    // Guardar la nueva asignación en el archivo 'asignaciones.txt'
    file_put_contents($archivoAsignaciones, $lineaAsignacion . PHP_EOL, FILE_APPEND);

    // Mensaje de éxito al registrar al usuario
    echo "Usuario registrado correctamente con tareas asignadas";
} else {
    // Mensaje de error si no se proporcionó un nombre de usuario
    echo "Error: no se proporcionó un nombre de usuario";
}
?>
