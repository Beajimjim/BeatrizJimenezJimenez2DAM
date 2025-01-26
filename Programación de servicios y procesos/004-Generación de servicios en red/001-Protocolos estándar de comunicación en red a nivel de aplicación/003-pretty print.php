<?php

    // Conexión a la base de datos utilizando la función mysqli_connect.
    // Se están pasando cuatro parámetros: servidor, nombre de usuario, contraseña y nombre de la base de datos.
    $mysqli = mysqli_connect("localhost", "crimson", "crimson", "crimson");

    // Consulta SQL para seleccionar el nombre y apellidos de los clientes de la tabla "clientes".
    $peticion = "
        SELECT 
        clientes.nombre AS 'Nombre del cliente',  -- Selecciona el campo 'nombre' y le da un alias descriptivo.
        clientes.apellidos AS 'Apellidos del cliente'  -- Selecciona el campo 'apellidos' con otro alias.
        FROM 
        clientes";  -- Especifica la tabla "clientes" como fuente de los datos.

    // Ejecuta la consulta SQL previamente definida utilizando mysqli_query.
    // $mysqli es la conexión a la base de datos y $peticion es la consulta SQL.
    $resultado = mysqli_query($mysqli, $peticion);
    
    // Inicialización de un array vacío para almacenar los resultados.
    $datos = [];
    
    // Bucle para recorrer cada fila del resultado de la consulta.
    // mysqli_fetch_assoc devuelve un array asociativo con los datos de la fila actual.
    while ($fila = mysqli_fetch_assoc($resultado)) {
         $datos[] = $fila;  // Se agrega cada fila obtenida al array $datos.
    }
    
    // Convierte el array $datos en una cadena JSON con formato legible.
    $json = json_encode($datos, JSON_PRETTY_PRINT);

    // Imprime la representación JSON de los datos en la salida.
    echo $json;

?>
