<?php

// Habilita el reporte de errores de MySQLi para que se muestren errores y excepciones
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // Establezco el nivel de retorno de errores de PHP

// Conexión a la base de datos utilizando mysqli
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa"); // Me conecto a la base de datos

// Construcción de la consulta SQL para verificar las credenciales del usuario
$query = "
    SELECT                                             
    usuario
    FROM usuarios 
    WHERE usuario = '".$_GET['usuario']."' 
    AND contrasena = '".$_GET['contrasena']."'
"; // Selecciono el usuario que coincide con las credenciales enviadas

// Ejecución de la consulta en la base de datos
$result = mysqli_query($mysqli, $query); // Ejecuto la petición contra la base de datos 

// Comprobación de si se obtuvo un resultado
if ($row = mysqli_fetch_assoc($result)) { // en el caso de que exista un usuario
    $row['resultado'] = 'ok'; // Le añado una propiedad 'resultado' y le digo que es 'ok'
    echo json_encode($row); // Devuelvo el resultado como JSON, incluyendo el usuario
}else{ // en caso de que no exista el usuario
    echo '{"Resultado:":"ko"}'; // Devuelvo un JSON indicando que el resultado es 'ko'
}

?>
