<?php

// Definición de la clase conexionDB para manejar operaciones con la base de datos.
class conexionDB {
    // Declaración de propiedades privadas para los datos de conexión y la conexión misma.
    private $servidor;
    private $usuario;
    private $contrasena;
    private $basededatos;
    private $conexion;

    // Constructor de la clase, que inicializa la conexión con la base de datos.
    public function __construct() {
        // Configuración de los datos de conexión.
        $this->servidor = "localhost";
        $this->usuario = "crimson";
        $this->contrasena = "crimson";
        $this->basededatos = "crimson";

        // Establecimiento de la conexión con la base de datos.
        $this->conexion = mysqli_connect(
            $this->servidor,
            $this->usuario,
            $this->contrasena,
            $this->basededatos
        );
    }

    // Método para buscar registros exactos en una tabla.
    public function buscar($tabla, $datos) {
        $peticion = "SELECT * FROM " . $tabla . " WHERE "; // Inicia la consulta.
        foreach ($datos as $clave => $valor) {
            $peticion .= $clave . "='" . $valor . "' AND "; // Añade condiciones.
        }
        $peticion .= " 1;"; // Añade una condición adicional para cerrar la consulta.

        $resultado = mysqli_query($this->conexion, $peticion); // Ejecuta la consulta.
        $retorno = [];
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $retorno[] = $fila; // Almacena los registros obtenidos.
        }
        $json = json_encode($retorno, JSON_PRETTY_PRINT); // Codifica los datos en JSON.
        return $json; // Devuelve el JSON.
    }

    // Método para buscar registros similares (usando LIKE).
    public function buscarSimilar($tabla, $datos) {
        $peticion = "SELECT * FROM " . $tabla . " WHERE "; // Inicia la consulta.
        foreach ($datos as $clave => $valor) {
            $peticion .= $clave . " LIKE '%" . $valor . "%' AND "; // Añade condiciones de similitud.
        }
        $peticion .= " 1;"; // Añade una condición adicional.

        $resultado = mysqli_query($this->conexion, $peticion); // Ejecuta la consulta.
        $retorno = [];
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $retorno[] = $fila; // Almacena los registros obtenidos.
        }
        $json = json_encode($retorno, JSON_PRETTY_PRINT); // Codifica los datos en JSON.
        return $json; // Devuelve el JSON.
    }

    // Método para obtener los datos de una tabla, considerando las claves foráneas.
    public function seleccionaTabla($tabla) {
        // Consulta para obtener las restricciones de claves foráneas.
        $query = "
            SELECT *
            FROM information_schema.key_column_usage
            WHERE table_name = '" . $tabla . "'
            AND REFERENCED_TABLE_NAME IS NOT NULL;
        ";
        $result = mysqli_query($this->conexion, $query);
        $restricciones = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $restricciones[] = $row; // Almacena las restricciones.
        }

        // Consulta para obtener los datos de la tabla.
        $query = "SELECT * FROM " . $tabla . ";";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];
            foreach ($row as $clave => $valor) {
                $pasas = true; // Variable para verificar restricciones.
                foreach ($restricciones as $restriccion) {
                    if ($clave == $restriccion["COLUMN_NAME"]) {
                        // Si la columna tiene una restricción, realizar otra consulta.
                        $query2 = "
                            SELECT *
                            FROM " . $restriccion["REFERENCED_TABLE_NAME"] . "
                            WHERE Identificador = " . $valor . ";
                        ";
                        $result2 = mysqli_query($this->conexion, $query2);
                        $cadena = "";
                        while ($row2 = mysqli_fetch_assoc($result2)) {
                            foreach ($row2 as $campo) {
                                $cadena .= $campo . "-"; // Construir un string con los valores.
                            }
                        }
                        $fila[$clave] = $cadena; // Guardar el resultado formateado.
                        $pasas = false;
                    }
                }
                if ($pasas) {
                    $fila[$clave] = $valor; // Si no hay restricciones, usar el valor directo.
                }
            }
            $resultado[] = $fila; // Almacenar la fila en el resultado final.
        }
        $json = json_encode($resultado, JSON_PRETTY_PRINT); // Codificar como JSON.
        return $json; // Devolver el JSON.
    }

    // Método para listar las tablas de la base de datos.
    public function listadoTablas() {
        $query = "
            SELECT table_name AS 'Tables_in_" . $this->basededatos . "',
                   table_comment AS 'Comentario'
            FROM information_schema.tables
            WHERE table_schema = '" . $this->basededatos . "';
        ";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];
            foreach ($row as $clave => $valor) {
                $fila[$clave] = $valor;
            }
            $resultado[] = $fila;
        }
        $json = json_encode($resultado, JSON_PRETTY_PRINT);
        return $json;
    }

    // Método para obtener las columnas de una tabla.
    public function columnasTabla($tabla) {
        $query = "SHOW COLUMNS FROM " . $tabla . ";";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];
            foreach ($row as $clave => $valor) {
                $fila[$clave] = $valor;
            }
            $resultado[] = $fila;
        }
        $json = json_encode($resultado, JSON_PRETTY_PRINT);
        return $json;
    }

    // Método para insertar registros en una tabla.
    public function insertaTabla($tabla, $valores) {
        $campos = "";
        $parametros = "";
        $tipos = "";
        $datos = [];

        foreach ($valores as $clave => $valor) {
            $campos .= $clave . ",";
            $parametros .= "?,";
            $tipos .= is_numeric($valor) ? "i" : "s";
            $datos[] = $valor;
        }
        $campos = rtrim($campos, ",");
        $parametros = rtrim($parametros, ",");

        $query = "INSERT INTO $tabla ($campos) VALUES ($parametros)";
        $stmt = $this->conexion->prepare($query);
        $stmt->bind_param($tipos, ...$datos);
        $stmt->execute();
        $stmt->close();
    }

    // Método para actualizar registros en una tabla.
    public function actualizaTabla($tabla, $valores, $id) {
        $query = "UPDATE " . $tabla . " SET ";
        foreach ($valores as $clave => $valor) {
            $query .= $clave . "='" . $valor . "', ";
        }
        $query = rtrim($query, ", ");
        $query .= " WHERE Identificador = " . $id;
        mysqli_query($this->conexion, $query);
    }

    // Método para eliminar registros de una tabla.
    public function eliminaTabla($tabla, $id) {
        $query = "DELETE FROM " . $tabla . " WHERE Identificador = " . $id;
        mysqli_query($this->conexion, $query);
    }

    // Métodos privados para codificar y decodificar datos en base64.
    private function codifica($entrada) {
        return base64_encode($entrada);
    }

    private function decodifica($entrada) {
        return base64_decode($entrada);
    }
}

?>


<!-- La clase conexionDB gestiona:

Conexión con la base de datos.
Operaciones CRUD (Crear, Leer, Actualizar, Eliminar).
Consultas personalizadas, incluyendo claves foráneas y relaciones entre tablas.
Conversión de datos en JSON para facilitar su uso en aplicaciones web. -->