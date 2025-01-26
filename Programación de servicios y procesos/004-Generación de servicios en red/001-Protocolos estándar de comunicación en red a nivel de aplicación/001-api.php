<?php
    // Conexión a la base de datos MySQL con las credenciales (host, usuario, contraseña y nombre de la base de datos)
    $mysqli = mysqli_connect("localhost", "crimson", "crimson", "crimson");

    // Consulta SQL para seleccionar los nombres y apellidos de la tabla "clientes"
    $peticion = "
        SELECT 
        clientes.nombre,
        clientes.apellidos
        FROM 
        clientes";

    // Ejecuta la consulta SQL en la base de datos y almacena el resultado
    $resultado = mysqli_query($mysqli, $peticion);
    
    // Inicializa un array vacío para almacenar los resultados
    $datos = [];
    
    // Recorre las filas del resultado de la consulta
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Añade cada fila (como un array asociativo) al array $datos
        $datos[] = $fila;
    }
    
    // Convierte el array $datos a formato JSON
    $json = json_encode($datos);

    // Envía el JSON como respuesta al cliente
    echo $json;

?>
