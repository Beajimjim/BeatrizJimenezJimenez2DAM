<?php

// Clase para manejar la conexión a la base de datos y operaciones CRUD
class conexionDB {

    // Propiedades privadas para almacenar datos de conexión
    private $servidor;
    private $usuario;
    private $contrasena;
    private $basededatos;
    private $conexion;

    // Constructor para inicializar datos y establecer conexión
    public function __construct() {
        $this->servidor = "localhost";
        $this->usuario = "crimson";
        $this->contrasena = "crimson";
        $this->basededatos = "crimson";

        // Establecer conexión a la base de datos
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

    // Método para buscar registros exactos en una tabla
    public function buscar($tabla, $datos) {
        $peticion = "SELECT * FROM " . $tabla . " WHERE ";
        foreach ($datos as $clave => $valor) {
            $peticion .= $clave . "='" . $valor . "' AND ";
        }
        $peticion .= "1;"; // Añadir condición para evitar error de sintaxis

        $resultado = mysqli_query($this->conexion, $peticion);
        $retorno = [];

        // Recuperar los resultados y almacenarlos en un array
        while ($fila = mysqli_fetch_assoc($resultado)) {
            $retorno[] = $fila;
        }

        // Devolver resultados en formato JSON
        return json_encode($retorno, JSON_PRETTY_PRINT);
    }

    // Método para buscar registros similares usando LIKE
    public function buscarSimilar($tabla, $datos) {
        $peticion = "SELECT * FROM " . $tabla . " WHERE ";
        foreach ($datos as $clave => $valor) {
            $peticion .= $clave . " LIKE '%" . $valor . "%' AND ";
        }
        $peticion .= "1;";

        $resultado = mysqli_query($this->conexion, $peticion);
        $retorno = [];

        while ($fila = mysqli_fetch_assoc($resultado)) {
            $retorno[] = $fila;
        }

        return json_encode($retorno, JSON_PRETTY_PRINT);
    }

    // Método para seleccionar datos de una tabla considerando restricciones
    public function seleccionaTabla($tabla) {
        // Consulta para obtener restricciones de llaves foráneas
        $query = "
            SELECT *
            FROM information_schema.key_column_usage
            WHERE table_name = '" . $tabla . "'
            AND REFERENCED_TABLE_NAME IS NOT NULL;
        ";
        $result = mysqli_query($this->conexion, $query);
        $restricciones = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $restricciones[] = $row;
        }

        // Consulta para obtener todos los registros de la tabla
        $query = "SELECT * FROM " . $tabla . ";";
        $result = mysqli_query($this->conexion, $query);
        $resultado = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $fila = [];
            $identificador = 1;

            foreach ($row as $clave => $valor) {
                $pasas = true;

                foreach ($restricciones as $restriccion) {
                    if ($clave == "Identificador") {
                        $identificador = $valor;
                    }

                    if ($clave == $restriccion["COLUMN_NAME"]) {
                        // Consulta para obtener datos referenciados
                        $query2 = "
                            SELECT *
                            FROM " . $restriccion["REFERENCED_TABLE_NAME"] . "
                            WHERE Identificador = " . $identificador . ";
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

        return json_encode($resultado, JSON_PRETTY_PRINT);
    }

    // Método para listar todas las tablas en la base de datos
    public function listadoTablas() {
        $query = "
            SELECT 
                table_name AS 'Tables_in_" . $this->basededatos . "', 
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

        return json_encode($resultado, JSON_PRETTY_PRINT);
    }

    // Método para obtener columnas de una tabla
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

        return json_encode($resultado, JSON_PRETTY_PRINT);
    }

    // Método para insertar datos en una tabla
    public function insertaTabla($tabla, $valores) {
        $campos = "";
        $datos = "";

        foreach ($valores as $clave => $valor) {
            $campos .= $clave . ",";
            $datos .= "'" . $valor . "',";
        }

        $campos = rtrim($campos, ",");
        $datos = rtrim($datos, ",");

        $query = "
            INSERT INTO " . $tabla . " (" . $campos . ") 
            VALUES (" . $datos . ");
        ";
        echo $query;
        mysqli_query($this->conexion, $query);
        return 0;
    }

    // Método para actualizar datos en una tabla
    public function actualizaTabla($tabla, $valores, $id) {
		// Inicia la consulta SQL para actualizar una tabla específica
		$query = "UPDATE " . $tabla . " SET ";
	
		// Recorre el array de valores, concatenando cada par clave-valor en la consulta SQL
		foreach ($valores as $clave => $valor) {
			// Agrega cada columna y su nuevo valor a la consulta, con formato 'columna = valor'
			$query .= $clave . "='" . $valor . "', ";
		}
	
		// Elimina la última coma y espacio que sobran después del último par clave-valor
		$query = rtrim($query, ", ");
	
		// Añade la cláusula WHERE para identificar qué registro se debe actualizar usando el identificador
		$query .= " WHERE Identificador = " . $id . ";";
	
		// Imprime la consulta para depuración (esto no debe usarse en producción por motivos de seguridad)
		echo $query;
	
		// Ejecuta la consulta SQL en la base de datos
		mysqli_query($this->conexion, $query);
	
		// Devuelve una cadena vacía (esto podría mejorarse devolviendo un mensaje de éxito o error)
		return "";
	}
    // Método para actualizar un solo campo
	public function actualizar($datos) {
		// Construye la consulta SQL para actualizar un campo específico en una tabla
		$query = "
			UPDATE " . $datos['tabla'] . " 
			SET " . $datos['columna'] . " = '" . $datos['valor'] . "'
			WHERE Identificador = " . $datos['Identificador'] . ";
		";
	
		// Ejecuta la consulta en la base de datos
		mysqli_query($this->conexion, $query);
	
		// Devuelve un mensaje de éxito en formato JSON
		return '{"mensaje":"ok"}';
	}
	

    // Método para eliminar un registro de una tabla
    public function eliminaTabla($tabla, $id) {
        $query = "DELETE FROM " . $tabla . " WHERE Identificador = " . $id . ";";
        mysqli_query($this->conexion, $query);
    }

    // Métodos para codificar y decodificar datos en base64
    private function codifica($entrada) {
        return base64_encode($entrada);
    }

    private function decodifica($entrada) {
        return base64_decode($entrada);
    }
}

?>
