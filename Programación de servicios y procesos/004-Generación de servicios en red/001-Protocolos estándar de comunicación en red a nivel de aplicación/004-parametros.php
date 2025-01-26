<?php
    // Establece la conexión con la base de datos MySQL utilizando las credenciales proporcionadas
    $mysqli = mysqli_connect("localhost", "crimson", "crimson", "crimson");

    // Utiliza un switch para determinar qué operación realizar, basada en el parámetro 'o' recibido en la URL
    switch($_GET['o']) {
        // Caso "clientes": Se ejecutará si el valor de 'o' es "clientes"
        case "clientes":
            // Define la consulta SQL para obtener los nombres y apellidos de todos los clientes
            $peticion = "
                SELECT 
                clientes.nombre AS 'Nombre del cliente', -- Cambia el nombre de la columna con un alias para mayor claridad
                clientes.apellidos AS 'Apellidos del cliente' -- Cambia el nombre de la columna con un alias
                FROM 
                clientes"; // Indica que se está seleccionando desde la tabla 'clientes'

            // Ejecuta la consulta y almacena el resultado en la variable $resultado
            $resultado = mysqli_query($mysqli, $peticion);
            $datos = []; // Inicializa un array vacío para almacenar los resultados

            // Recorre las filas devueltas por la consulta y las almacena en el array $datos
            while ($fila = mysqli_fetch_assoc($resultado)) {
                $datos[] = $fila; // Añade cada fila (como un array asociativo) al array $datos
            }

            // Convierte el array $datos a formato JSON con formato legible (pretty print)
            $json = json_encode($datos, JSON_PRETTY_PRINT);

            // Envía el JSON generado como respuesta
            echo $json;
            break;

        // Caso "cliente": Se ejecutará si el valor de 'o' es "cliente"
        case "cliente":
            // Define la consulta SQL para obtener el nombre y apellidos de un cliente específico, utilizando su identificador
            $peticion = "
                SELECT 
                clientes.nombre AS 'Nombre del cliente', -- Alias para mayor claridad
                clientes.apellidos AS 'Apellidos del cliente' -- Alias para mayor claridad
                FROM 
                clientes -- Selecciona desde la tabla 'clientes'
                WHERE clientes.Identificador = ".$_GET['id']." -- Filtra el cliente por su identificador recibido por GET";

            // Ejecuta la consulta y almacena el resultado en la variable $resultado
            $resultado = mysqli_query($mysqli, $peticion);
            $datos = []; // Inicializa un array vacío para almacenar los resultados

            // Recorre las filas devueltas por la consulta y las almacena en el array $datos
            while ($fila = mysqli_fetch_assoc($resultado)) {
                $datos[] = $fila; // Añade cada fila (como un array asociativo) al array $datos
            }

            // Convierte el array $datos a formato JSON con formato legible (pretty print)
            $json = json_encode($datos, JSON_PRETTY_PRINT);

            // Envía el JSON generado como respuesta
            echo $json;
            break;

        // Caso por defecto: Se ejecutará si el valor de 'o' no coincide con ningún caso anterior
        default:
            // Devuelve un JSON indicando un resultado "ko" como mensaje de error
            echo "{'resultado':'ko'}";
    }
?>
