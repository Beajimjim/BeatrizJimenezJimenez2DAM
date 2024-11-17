<?php
// archivo: mostrar.php

// Habilitar la visualización de errores (solo para depuración)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurar la cabecera para devolver JSON
header('Content-Type: application/json');

// Nombre del archivo de asignaciones
$archivoAsignaciones = 'asignaciones.txt';

// Verificar si el archivo de asignaciones existe
if (!file_exists($archivoAsignaciones)) {
    // Si el archivo no existe, devolver un array vacío en formato JSON y salir del script
    echo json_encode([]);
    exit;
}

// Leer el contenido del archivo de asignaciones, línea por línea
$asignaciones = file($archivoAsignaciones, FILE_IGNORE_NEW_LINES);
$usuarios = []; // Inicializar un array para almacenar los datos de los usuarios

// Procesar cada línea del archivo de asignaciones
foreach ($asignaciones as $linea) {
    // Asegurarse de que la línea contiene el carácter ":" que separa usuario y tareas
    if (strpos($linea, ":") === false) {
        continue; // Si no contiene ":", saltar a la siguiente línea
    }

    // Separar el nombre del usuario y la lista de tareas
    list($usuario, $tareas) = explode(":", $linea);

    // Eliminar los corchetes "[" y "]" de la lista de tareas
    $tareas = str_replace(["[", "]"], "", $tareas);

    // Convertir la lista de tareas a un array, separando por comas
    $tareasArray = explode(",", $tareas);

    // Calcular la suma de las tareas, convirtiendo cada elemento a un número entero
    $sumaTareas = array_sum(array_map('intval', $tareasArray));

    // Añadir el usuario, las tareas y el resultado al array de usuarios
    $usuarios[] = [
        'usuario' => trim($usuario), // Nombre del usuario (sin espacios extra)
        'tareas' => array_map('trim', $tareasArray), // Array de tareas (sin espacios extra)
        'resultado' => $sumaTareas // Resultado de la suma de las tareas
    ];
}

// Devolver los datos en formato JSON
echo json_encode($usuarios);
?>
