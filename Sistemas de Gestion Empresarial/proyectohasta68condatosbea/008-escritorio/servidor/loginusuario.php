<?php
// Habilita el informe de errores para la conexión a la base de datos, lanzando excepciones en caso de errores.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Se establece la conexión a la base de datos con el servidor, usuario, contraseña y nombre de la base de datos.
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");

// Se construye una consulta SQL para seleccionar el usuario de la tabla 'usuarios'.
// Se utilizan parámetros GET para recibir el usuario y la contraseña desde la solicitud HTTP.
$query = "
    SELECT                                             
    usuario
    FROM usuarios 
    WHERE usuario = '".$_GET['usuario']."' 
    AND contrasena = '".$_GET['contrasena']."'
"; // Comprueba si el usuario enviado existe en la base de datos

// Se ejecuta la consulta contra la base de datos.
$result = mysqli_query($mysqli, $query);

// Se verifica si se obtuvo algún resultado de la consulta.
if ($row = mysqli_fetch_assoc($result)) { // En el caso de que exista un usuario
    $row['resultado'] = 'ok'; // Se añade una propiedad 'resultado' al array con valor 'ok'
    echo json_encode($row); // Se convierte el array a formato JSON y se envía como respuesta al cliente.
} else { // En caso de que no exista el usuario
    echo '{"Resultado:":"ko"}'; // Se devuelve un JSON con 'Resultado' en 'ko' indicando que la autenticación falló.
}
?>
