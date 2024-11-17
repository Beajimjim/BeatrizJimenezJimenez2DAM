<?php

// Clase para conectar y manipular datos en MongoDB
class ConectaMongo {
    // Propiedades privadas para los detalles de conexión
    private $servidor;
    private $basededatos;
    private $conexion;

    // Constructor de la clase: se encarga de inicializar la conexión con MongoDB
    public function __construct() {
        // URL del servidor de MongoDB
        $this->servidor = "mongodb://localhost:27017";

        // Nombre de la base de datos que se utilizará
        $this->basededatos = "crimson";

        // Creación de la conexión usando el Driver Manager de MongoDB
        $this->conexion = new MongoDB\Driver\Manager($this->servidor);
    }

    // Método para listar los documentos de una colección
    public function listar($coleccion) {
        // Crear una consulta vacía (sin filtros)
        $query = new MongoDB\Driver\Query([]);

        // Crear el namespace de la colección (base de datos + colección)
        $namespace = $this->basededatos . "." . $coleccion;

        // Ejecutar la consulta y obtener un cursor con los resultados
        $cursor = $this->conexion->executeQuery($namespace, $query);

        // Almacenar los resultados en un array
        $resultado = [];
        foreach ($cursor as $document) {
            $resultado[] = $document;
        }

        // Convertir los resultados a formato JSON con formato legible
        $json = json_encode($resultado, JSON_PRETTY_PRINT);

        // Retornar el JSON
        return $json;
    }

    // Método para insertar datos en una colección
    public function insertar($coleccion, $datos) {
        // Crear el namespace de la colección
        $namespace = $this->basededatos . "." . $coleccion;

        // Crear una operación BulkWrite para realizar la inserción
        $bulk = new MongoDB\Driver\BulkWrite;
        $bulk->insert($datos);

        // Ejecutar la operación de inserción
        $this->conexion->executeBulkWrite($namespace, $bulk);

        // Realizar una consulta para obtener los documentos después de la inserción (opcional)
        $query = new MongoDB\Driver\Query([]);
        $cursor = $this->conexion->executeQuery($namespace, $query);

        // Retornar 0 indicando que la inserción fue exitosa (puede cambiarse para retornar datos o un mensaje)
        return 0;
    }

    // Método para listar todas las colecciones de la base de datos
    public function listarColecciones() {
        // Crear un comando para listar las colecciones
        $command = new MongoDB\Driver\Command(["listCollections" => 1]);

        // Ejecutar el comando y obtener el cursor con las colecciones
        $cursor = $this->conexion->executeCommand($this->basededatos, $command);

        // Array para almacenar los nombres de las colecciones
        $colecciones = [];

        // Crear la clave para el nombre de la colección (similar a MySQL para consistencia)
        $nombreClave = "Tables_in_" . $this->basededatos;

        // Recorrer el cursor y obtener los nombres de las colecciones
        foreach ($cursor as $collection) {
            $fila = [
                $nombreClave => $collection->name,
                "Comentario" => ""  // Comentario vacío (MongoDB no tiene comentarios para colecciones)
            ];
            $colecciones[] = $fila;
        }

        // Convertir los nombres de las colecciones a formato JSON con formato legible
        $json = json_encode($colecciones, JSON_PRETTY_PRINT);

        // Retornar el JSON
        return $json;
    }
}

?>
