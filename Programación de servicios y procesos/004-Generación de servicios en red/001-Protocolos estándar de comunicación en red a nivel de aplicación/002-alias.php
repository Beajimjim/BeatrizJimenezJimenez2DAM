<?php
    // Establece la conexión con la base de datos MySQL.
    // Se proporcionan los parámetros: host, usuario, contraseña y nombre de la base de datos.
    $mysqli = mysqli_connect("localhost", "crimson", "crimson", "crimson");

    // Define la consulta SQL para seleccionar los datos de la tabla "clientes".
    // Aquí se utilizan alias ('AS') para las columnas "nombre" y "apellidos" para darles nombres personalizados.
    $peticion = "
        SELECT 
        clientes.nombre AS 'Nombre del cliente', -- El alias cambia la etiqueta de la columna a 'Nombre del cliente'.
        clientes.apellidos AS 'Apellidos del cliente' -- El alias cambia la etiqueta de la columna a 'Apellidos del cliente'.
        FROM 
        clientes"; // Se selecciona la tabla "clientes".

    // Ejecuta la consulta en la base de datos y almacena el resultado en la variable $resultado.
    $resultado = mysqli_query($mysqli, $peticion);
    
    // Inicializa un array vacío para almacenar los resultados obtenidos.
    $datos = [];
    
    // Recorre las filas del resultado de la consulta.
    while ($fila = mysqli_fetch_assoc($resultado)) {
        // Añade cada fila (como un array asociativo) al array $datos.
        $datos[] = $fila;
    }
    
    // Convierte el array $datos al formato JSON.
    $json = json_encode($datos);

    // Envía el JSON como respuesta al cliente.
    echo $json;

?>
