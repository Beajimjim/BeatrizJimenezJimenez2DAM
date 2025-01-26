function convierteTipoDato(tipo) {
    // Declarar una variable para almacenar el tipo de dato convertido
    let tipodevuelto;

    // Verificar si el tipo de dato incluye "varchar"
    if (tipo.includes("varchar")) {
        // Si es un "varchar", lo convertimos en un campo de texto
        tipodevuelto = "text";
    } 
    // Verificar si el tipo de dato incluye "int"
    else if (tipo.includes("int")) {
        // Si es un entero, lo convertimos en un campo numérico
        tipodevuelto = "number";
    } 
    // Verificar si el tipo de dato incluye "date"
    else if (tipo.includes("date")) {
        // Si es una fecha, lo convertimos en un campo de fecha
        tipodevuelto = "date";
    } 
    // Verificar si el tipo de dato incluye "decimal"
    else if (tipo.includes("decimal")) {
        // Si es un decimal, lo convertimos en un campo numérico
        tipodevuelto = "number";
    } 
    // Verificar si el tipo de dato incluye "time"
    else if (tipo.includes("time")) {
        // Si es un tiempo, lo convertimos en un campo de hora
        tipodevuelto = "time";
    } 
    // Verificar si el tipo de dato incluye "blob"
    else if (tipo.includes("blob")) {
        // Si es un "blob", lo convertimos en un campo de archivo
        tipodevuelto = "file";
    }

    // Devolver el tipo de dato convertido
    return tipodevuelto;
}


// Explicación del código:
// Propósito:

// La función toma un tipo de dato recibido desde la base de datos y lo convierte en un tipo de entrada HTML adecuado.
// Lógica de conversión:

// varchar → "text": Se convierte en un campo de texto.
// int o decimal → "number": Se convierten en campos numéricos.
// date → "date": Se convierte en un campo de fecha.
// time → "time": Se convierte en un campo de hora.
// blob → "file": Se convierte en un campo de carga de archivos.
// Cómo funciona:

// Usa includes() para verificar si el tipo recibido contiene una palabra clave específica.
// Asigna el tipo de entrada HTML correspondiente a la variable tipodevuelto.
// Resultado:

// Devuelve un tipo de dato que puede ser utilizado directamente como el valor del atributo type en un elemento <input> HTML.
// Este enfoque asegura que los campos del formulario sean apropiados para los tipos de datos de la base de datos.