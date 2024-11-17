<?php

// Clase para manejar la conexión a la base de datos y operaciones CRUD básicas
class conexionDB {

    // Propiedades privadas para almacenar los datos de conexión
    private $servidor;
    private $usuario;
    private $contrasena;
    private $basededatos;
    private $conexion;

    // Constructor para inicializar los datos de conexión y establecer la conexión a la base de datos
    public function __construct() {
        // Asignación de los datos de conexión
        $this->servidor = "localhost";
        $this->usuario = "crimson";
        $this->contrasena = "crimson";
        $this->basededatos = "crimson";

        // Establecer la conexión a la base de datos
        $this->conexion = mysqli_connect(
            $this->servidor,
            $this->usuario,
            $this->contrasena,
            $this->basededatos
        );

        // Verificar si la conexión fue exitosa
        if (!$this->conexion) {
            die("Error de conexión: " . mysqli_connect_error());
        }
    }

    // Método para seleccionar una tabla y obtener sus datos, considerando restricciones
    public function seleccionaTabla($tabla) {
        // Consulta para obtener columnas con restricciones (llaves foráneas)
        $query = "
            SELECT *
            FROM information_schema.key_column_usage
            WHERE table_name = '" . $tabla . "'
            AND REFERENCED_TABLE_NAME IS NOT NULL;
        ";

        // Ejecutar la consulta y almacenar las restricciones
        $result = mysqli_query($this->conexion, $query);
        $restricciones = [];

        // Obtener las restricciones y almacenarlas en un array
        while ($row = mysqli_fetch_assoc($result)) {
            $restricciones[] = $row;
        }

        // Consulta para obtener todos los registros de la tabla
        $query = "SELECT * FROM " . $tabla . ";";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];

        // Recorrer los registros obtenidos
        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];

            // Recorrer cada columna del registro
            foreach ($row as $clave => $valor) {
                $pasas = true; // Variable para verificar si hay restricciones

                // Verificar si la columna tiene restricciones
                foreach ($restricciones as $restriccion) {
                    if ($clave == $restriccion["COLUMN_NAME"]) {
                        // Obtener datos de la tabla referenciada
                        $query2 = "
                            SELECT * 
                            FROM " . $restriccion["REFERENCED_TABLE_NAME"] . ";
                        ";
                        $result2 = mysqli_query($this->conexion, $query2);
                        $cadena = "";

                        // Concatenar los datos de la tabla referenciada
                        while ($row2 = mysqli_fetch_assoc($result2)) {
                            foreach ($row2 as $campo) {
                                $cadena .= $campo . "-";
                            }
                        }

                        // Asignar la cadena creada en lugar del valor original
                        $fila[$clave] = $cadena;
                        $pasas = false; // Indicar que la columna tiene restricciones
                    }
                }

                // Si no hay restricciones, se mantiene el valor original
                if ($pasas) {
                    $fila[$clave] = $valor;
                }
            }

            // Agregar la fila al resultado final
            $resultado[] = $fila;
        }

        // Codificar el resultado como JSON y devolverlo
        $json = json_encode($resultado, JSON_PRETTY_PRINT);
        return $json;
    }

    // Método para obtener un listado de todas las tablas en la base de datos
    public function listadoTablas() {
        // Consulta para listar todas las tablas
        $query = "SHOW TABLES;";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];

        // Recorrer los resultados y agregarlos al array
        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];
            foreach ($row as $clave => $valor) {
                $fila[$clave] = $valor;
            }
            $resultado[] = $fila;
        }

        // Codificar el resultado como JSON y devolverlo
        $json = json_encode($resultado, JSON_PRETTY_PRINT);
        return $json;
    }

    // Método para insertar un nuevo registro en una tabla
    public function insertaTabla($tabla, $valores) {
        $campos = "";
        $datos = "";

        // Crear cadenas de campos y valores
        foreach ($valores as $clave => $valor) {
            $campos .= $clave . ",";
            $datos .= "'" . $valor . "',";
        }

        // Eliminar la última coma
        $campos = rtrim($campos, ",");
        $datos = rtrim($datos, ",");

        // Crear la consulta de inserción
        $query = "
            INSERT INTO " . $tabla . " 
            (" . $campos . ") 
            VALUES (" . $datos . ");
        ";

        // Ejecutar la consulta
        $result = mysqli_query($this->conexion, $query);
        return 0;
    }

    // Método para actualizar un registro en una tabla
    public function actualizaTabla($tabla, $valores, $id) {
        $query = "UPDATE " . $tabla . " SET ";

        // Crear la parte de actualización de la consulta
        foreach ($valores as $clave => $valor) {
            $query .= $clave . "='" . $valor . "', ";
        }

        // Eliminar la última coma y espacio
        $query = rtrim($query, ", ");

        // Añadir la cláusula WHERE
        $query .= " WHERE Identificador = " . (int)$id . ";";

        // Imprimir la consulta (útil para depuración)
        echo $query;

        // Ejecutar la consulta
        $result = mysqli_query($this->conexion, $query);
        return "";
    }

    // Método para eliminar un registro de una tabla
    public function eliminaTabla($tabla, $id) {
        // Crear la consulta de eliminación
        $query = "
            DELETE FROM " . $tabla . " 
            WHERE Identificador = " . (int)$id . ";
        ";

        // Ejecutar la consulta
        $result = mysqli_query($this->conexion, $query);
    }

    // Método privado para codificar una entrada con base64
    private function codifica($entrada) {
        return base64_encode($entrada);
    }

    // Método privado para decodificar una entrada con base64
    private function decodifica($entrada) {
        return base64_decode($entrada);
    }
}

?>
