<?php
// Habilita el informe de errores para la conexión a la base de datos, lanzando excepciones en caso de errores.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Se establece la conexión a la base de datos utilizando el servidor, usuario, contraseña y nombre de la base de datos.
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");

// Se construye una consulta SQL para seleccionar el nombre de usuario basado en las credenciales proporcionadas.
// Se utilizan parámetros de entrada GET para obtener el usuario y la contraseña.
// Nota: Esto es inseguro y vulnerable a inyecciones SQL.
$query = "
    SELECT                                             
        usuario
    FROM usuarios 
    WHERE usuario = '".$_GET['usuario']."' 
    AND password = '".$_GET['password']."'
"; // Se comprueba si el usuario y la contraseña coinciden en la base de datos.

// Se ejecuta la consulta contra la base de datos.
$result = mysqli_query($mysqli, $query);

// Se verifica si hay resultados en la consulta.
if ($row = mysqli_fetch_assoc($result)) { // Si se encuentra un usuario
    $row['resultado'] = 'ok'; // Se añade una propiedad 'resultado' con el valor 'ok'.
    echo json_encode($row); // Se convierte el resultado a JSON y se envía como respuesta al cliente.
} else { // Si no se encuentra un usuario
    echo '{"Resultado:":"ko"}'; // Se devuelve un JSON indicando que el login ha fallado.
}

?>
