<?php
    // Establezco el nivel de retorno de errores de PHP para facilitar la depuración
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    
    // Me conecto a la base de datos utilizando las credenciales y el nombre de la base de datos
    $mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");
    
    // Construyo la consulta SQL para eliminar un registro de la tabla especificada
    // La tabla y el identificador son obtenidos a través de parámetros GET
    $query = "
        DELETE FROM " . $_GET['tabla'] . " WHERE Identificador = " . $_GET['id'] . ";
    ";
    
    // Imprimo la consulta generada para verificarla (solo debe usarse para depuración)
    echo $query;

    // Ejecuto la consulta contra la base de datos
    $result = mysqli_query($mysqli, $query);
    
    // Creo un array vacío para almacenar los resultados (aunque no se espera que haya resultados en una eliminación)
    $aplicaciones = [];
    
    // Mientras haya filas en el resultado, las añado al array (esto es inusual para una operación DELETE)
    while ($row = mysqli_fetch_assoc($result)) {
        $aplicaciones[] = $row; // Añado cada fila al array
    }
    
    // Devuelvo el array en formato JSON
    echo json_encode($aplicaciones);
?>
