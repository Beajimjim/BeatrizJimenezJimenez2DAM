<?php

// Definición de la clase para manejar la conexión a la base de datos
class conexionDB {

    // Propiedades privadas para almacenar los datos de conexión
    private $servidor;
    private $usuario;
    private $contrasena;
    private $basededatos;
    private $conexion;

    // Constructor: Inicializa los datos de conexión y establece la conexión con la base de datos
    public function __construct() {
        $this->servidor = "localhost";
        $this->usuario = "crimson";
        $this->contrasena = "crimson";
        $this->basededatos = "crimson";

        // Conectar a la base de datos utilizando mysqli
        $this->conexion = mysqli_connect(
            $this->servidor,
            $this->usuario,
            $this->contrasena,
            $this->basededatos
        );
    }

    // Método para buscar registros exactos en una tabla
    public function buscar($tabla, $datos) {
        $peticion = "SELECT * FROM " . $tabla . " WHERE ";

        // Construir la consulta con los datos proporcionados
        foreach ($datos as $clave => $valor) {
            $peticion .= $clave . "='" . $valor . "' AND ";
        }

        $peticion .= " 1;"; // Añadir condición siempre verdadera para evitar errores

        // Ejecutar la consulta y obtener el resultado
        $resultado = mysqli_query($this->conexion, $peticion);
        $retorno = [];

        // Recorrer los resultados y almacenarlos en un array
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $retorno[] = $fila;
        }

        // Devolver los datos como JSON
        return json_encode($retorno, JSON_PRETTY_PRINT);
    }

    // Método para buscar registros similares utilizando LIKE
    public function buscarSimilar($tabla, $datos) {
        $peticion = "SELECT * FROM " . $tabla . " WHERE ";

        // Construir la consulta con coincidencias parciales
        foreach ($datos as $clave => $valor) {
            $peticion .= $clave . " LIKE '%" . $valor . "%' AND ";
        }

        $peticion .= " 1;";

        // Ejecutar la consulta y obtener el resultado
        $resultado = mysqli_query($this->conexion, $peticion);
        $retorno = [];

        // Recorrer los resultados y almacenarlos en un array
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $retorno[] = $fila;
        }

        // Devolver los datos como JSON
        return json_encode($retorno, JSON_PRETTY_PRINT);
    }

    // Método para obtener las restricciones de una tabla
    public function seleccionaTabla($tabla) {
        // Consulta para obtener claves foráneas de la tabla
        $query = "
            SELECT *
            FROM information_schema.key_column_usage
            WHERE table_name = '" . $tabla . "'
            AND REFERENCED_TABLE_NAME IS NOT NULL;
        ";

        // Ejecutar la consulta y almacenar las restricciones
        $result = mysqli_query($this->conexion, $query);
        $restricciones = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $restricciones[] = $row;
        }

        // Consulta para seleccionar todos los registros de la tabla
        $query = "SELECT * FROM " . $tabla . ";";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];

        // Procesar los resultados de la tabla
        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];
            foreach ($row as $clave => $valor) {
                $pasas = true;
                foreach ($restricciones as $restriccion) {
                    if ($clave == $restriccion["COLUMN_NAME"]) {
                        // Obtener datos relacionados de la tabla referenciada
                        $query2 = "
                            SELECT * 
                            FROM " . $restriccion["REFERENCED_TABLE_NAME"] . "
                            WHERE Identificador = " . $valor . ";
                        ";
                        $result2 = mysqli_query($this->conexion, $query2);
                        $cadena = "";
                        while ($row2 = mysqli_fetch_assoc($result2)) {
                            foreach ($row2 as $campo) {
                                $cadena .= $campo . "-";
                            }
                        }
                        $fila[$clave] = $cadena;
                        $pasas = false;
                    }
                }
                if ($pasas) {
                    $fila[$clave] = $valor;
                }
            }
            $resultado[] = $fila;
        }

        // Devolver los resultados como JSON
        return json_encode($resultado, JSON_PRETTY_PRINT);
    }

    // Método para obtener el listado de tablas en la base de datos
    public function listadoTablas() {
        $query = "
            SELECT 
                table_name AS 'Tables_in_" . $this->basededatos . "', 
                table_comment AS 'Comentario'
            FROM 
                information_schema.tables
            WHERE 
                table_schema = '" . $this->basededatos . "';
        ";

        $result = mysqli_query($this->conexion, $query);
        $resultado = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $resultado[] = $row;
        }

        return json_encode($resultado, JSON_PRETTY_PRINT);
    }

    // Método para obtener las columnas de una tabla
    public function columnasTabla($tabla) {
        $query = "SHOW COLUMNS FROM " . $tabla . ";";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $resultado[] = $row;
        }

        return json_encode($resultado, JSON_PRETTY_PRINT);
    }

    // Método para insertar datos en una tabla
    public function insertaTabla($tabla, $valores) {
        $campos = "";
        $parametros = "";
        $tipos = "";
        $datos = [];

        foreach ($valores as $clave => $valor) {
            $campos .= $clave . ",";
            $parametros .= "?,";
            $tipos .= is_array($valor) ? "b" : "s";
            $datos[] = is_array($valor) ? file_get_contents($_FILES[$clave]['tmp_name']) : $valor;
        }

        $campos = rtrim($campos, ",");
        $parametros = rtrim($parametros, ",");

        $query = "INSERT INTO $tabla ($campos) VALUES ($parametros)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param($tipos, ...$datos);

        $stmt->execute();
        $stmt->close();
    }

    // Método para actualizar datos en una tabla
    public function actualizaTabla($tabla, $valores, $id) {
        $query = "UPDATE $tabla SET ";
        foreach ($valores as $clave => $valor) {
            $query .= "$clave='$valor', ";
        }
        $query = rtrim($query, ", ");
        $query .= " WHERE Identificador = $id;";
        mysqli_query($this->conexion, $query);
    }

    // Método para eliminar un registro de una tabla
    public function eliminaTabla($tabla, $id) {
        $query = "DELETE FROM $tabla WHERE Identificador = $id;";
        mysqli_query($this->conexion, $query);
    }

    // Métodos privados para codificar y decodificar datos
    private function codifica($entrada) {
        return base64_encode($entrada);
    }

    private function decodifica($entrada) {
        return base64_decode($entrada);
    }
}

?>
