<?php
// Establezco el nivel de retorno de errores de PHP para facilitar la depuración.
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);			

// Me conecto a la base de datos especificando el servidor, usuario, contraseña y nombre de la base de datos.
$mysqli = mysqli_connect("localhost", "appsge", "appsge", "sistemagestionempresa");		

// Defino la consulta SQL para seleccionar el usuario basado en los parámetros de entrada.
$query = "
    SELECT                                             
    usuario
    FROM usuarios 
    WHERE usuario = '".$_GET['usuario']."' // Obtengo el nombre de usuario de la solicitud
    AND password = '".$_GET['password']."'  // Obtengo la contraseña de la solicitud
"; // La consulta busca un usuario que coincida con los datos enviados.

// Ejecuto la consulta en la base de datos y guardo el resultado.
$result = mysqli_query($mysqli, $query);				

// Verifico si se ha encontrado un resultado.
if ($row = mysqli_fetch_assoc($result)) { // Si existe al menos un usuario coincidente...
    $row['resultado'] = 'ok'; // Agrego un campo 'resultado' al array para indicar que la autenticación fue exitosa.
    echo json_encode($row); // Codifico el array en formato JSON y lo devuelvo al cliente.
} else { // En caso de que no se encuentre un usuario coincidente...
    echo '{"Resultado:":"ko"}'; // Devuelvo un JSON indicando que la autenticación falló.
}
	
?>
