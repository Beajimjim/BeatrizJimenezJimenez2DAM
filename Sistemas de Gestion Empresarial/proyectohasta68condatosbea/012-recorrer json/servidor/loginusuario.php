<?php
// Establece el nivel de reporte de errores para la conexión a la base de datos, lanzando excepciones en caso de errores.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Establece la conexión a la base de datos utilizando las credenciales proporcionadas.
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");

// Se construye una consulta SQL para seleccionar el usuario que coincide con el nombre de usuario y contraseña proporcionados.
$query = "
    SELECT                                             
    usuario
    FROM usuarios 
    WHERE usuario = '".$_GET['usuario']."'  // El nombre de usuario se obtiene de la URL (GET)
    AND contrasena = '".$_GET['contrasena']."'    // La contraseña se obtiene también de la URL (GET)
"; // Solo se está trayendo el usuario, no se trae la contraseña ni ningún dato más.

// Se ejecuta la consulta contra la base de datos.
$result = mysqli_query($mysqli, $query); // Se ejecuta la petición a la base de datos.

// Se verifica si se obtuvo algún resultado.
if ($row = mysqli_fetch_assoc($result)) { // En caso de que exista un usuario coincidente
    $row['resultado'] = 'ok'; // Se añade una propiedad 'resultado' con el valor 'ok'.
    echo json_encode($row); // Se devuelve el resultado en formato JSON, incluyendo el usuario.
} else { // En caso de que no se encuentre el usuario
    echo '{"Resultado:":"ko"}'; // Se devuelve un JSON indicando que el resultado es 'ko'.
}
?>
