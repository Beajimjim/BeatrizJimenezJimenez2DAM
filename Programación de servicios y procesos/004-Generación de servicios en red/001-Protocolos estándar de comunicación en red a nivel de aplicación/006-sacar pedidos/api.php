<?php

ini_set('display_errors', 1); // Muestra errores
ini_set('display_startup_errors', 1); // Muestra errores de inicio
error_reporting(E_ALL); // Reporta todos los errores

header('Content-Type: application/json'); // Asegura que la respuesta sea interpretada como JSON

$mysqli = mysqli_connect("localhost", "crimson", "crimson", "crimson");

// Verifica la conexión
if (!$mysqli) {
    die(json_encode(["error" => "Error al conectar con la base de datos"]));
}

switch ($_GET['o']) {
    case "clientes":
        $peticion = "
            SELECT 
                clientes.nombre AS nombre,
                clientes.apellidos AS apellidos,
                pedidos.fecha AS fecha_pedido,
                lineaspedido.productos_nombre AS producto,
                lineaspedido.cantidad AS cantidad
            FROM clientes
            LEFT JOIN pedidos ON clientes.Identificador = pedidos.clientes_nombre
            LEFT JOIN lineaspedido ON pedidos.Identificador = lineaspedido.pedidos_fecha
        ";

        $resultado = mysqli_query($mysqli, $peticion);

        // Verifica si la consulta tiene errores
        if (!$resultado) {
            die(json_encode(["error" => "Error en la consulta: " . mysqli_error($mysqli)]));
        }

        $datos = [];
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $cliente_key = $fila['nombre'] . " " . $fila['apellidos'];
            if (!isset($datos[$cliente_key])) {
                $datos[$cliente_key] = [
                    "cliente" => [
                        "nombre" => $fila['nombre'],
                        "apellidos" => $fila['apellidos']
                    ],
                    "pedidos" => []
                ];
            }

            if ($fila['fecha_pedido']) {
                $pedido_key = $fila['fecha_pedido'];
                if (!isset($datos[$cliente_key]["pedidos"][$pedido_key])) {
                    $datos[$cliente_key]["pedidos"][$pedido_key] = [
                        "fecha" => $fila['fecha_pedido'],
                        "lineaspedido" => []
                    ];
                }

                if ($fila['producto'] && $fila['cantidad']) {
                    $datos[$cliente_key]["pedidos"][$pedido_key]["lineaspedido"][] = [
                        "producto" => $fila['producto'],
                        "cantidad" => $fila['cantidad']
                    ];
                }
            }
        }

        $output = [];
        foreach ($datos as $cliente) {
            $cliente_pedidos = [];
            foreach ($cliente['pedidos'] as $pedido) {
                $cliente_pedidos[] = $pedido;
            }
            $output[] = [
                "cliente" => $cliente['cliente'],
                "pedidos" => $cliente_pedidos
            ];
        }

        // Devuelve el JSON con pretty print
        echo json_encode($output, JSON_PRETTY_PRINT);
        break;

    default:
        echo json_encode(["error" => "Operación no válida"]);
}
?>
