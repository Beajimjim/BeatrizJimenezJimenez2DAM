// Función que se activa cuando el Worker recibe datos enviados desde el hilo principal
onmessage = function(datos) {
    console.log("worker arrancado, vamos a trabajar"); // Mensaje de depuración para indicar que el Worker ha comenzado

    // Iteramos sobre los píxeles de la imagen
    // Cada píxel está compuesto por 4 valores consecutivos: R (Rojo), G (Verde), B (Azul), A (Alfa)
    for (let i = 0; i < datos.data.length; i += 4) { 
        let c = datos.data; // Referencia al array de datos de píxeles

        /*---------------------------------------- ESCALA DE GRISES ----------------------------------------
        // Calculamos el promedio de los valores RGB para convertir el píxel a escala de grises
        let gris = Math.round((c[i] + c[i + 1] + c[i + 2]) / 3);
        // Asignamos el valor promedio (gris) a los canales R, G y B
        datos.data[i] = gris;       // Canal Rojo
        datos.data[i + 1] = gris;   // Canal Verde
        datos.data[i + 2] = gris;   // Canal Azul
        -----------------------------------------------------------------------------------------------*/

        /*---------------------------------------- EFECTO NEGATIVO ----------------------------------------
        // Invertimos los valores RGB para obtener el negativo del color
        datos.data[i] = 255 - datos.data[i];       // Invertimos el canal Rojo
        datos.data[i + 1] = 255 - datos.data[i + 1]; // Invertimos el canal Verde
        datos.data[i + 2] = 255 - datos.data[i + 2]; // Invertimos el canal Azul
        -----------------------------------------------------------------------------------------------*/

        //---------------------------------------- EFECTO UMBRAL ----------------------------------------
        // Aplicamos un umbral (threshold) al píxel basado en el valor del canal Rojo (datos.data[i])
        if (datos.data[i] < 100) { // Si el valor del canal Rojo es menor que 100
            datos.data[i] = 0;       // Asignamos negro al canal Rojo
            datos.data[i + 1] = 0;   // Asignamos negro al canal Verde
            datos.data[i + 2] = 0;   // Asignamos negro al canal Azul
        } else { // Si el valor del canal Rojo es mayor o igual a 100
            datos.data[i] = 255;     // Asignamos blanco al canal Rojo
            datos.data[i + 1] = 255; // Asignamos blanco al canal Verde
            datos.data[i + 2] = 255; // Asignamos blanco al canal Azul
        }
       // -----------------------------------------------------------------------------------------------
    }

    // Mensaje de depuración para indicar que el Worker ha terminado su tarea
    console.log("worker finalizado, devolvemos al hilo principal");

    // Enviamos los datos procesados de vuelta al hilo principal
    postMessage(datos.data);
};


// Explicación Detallada:
// onmessage:

// Este evento se ejecuta cuando el hilo principal envía datos al Worker.
// El objeto datos contiene los valores RGBA de los píxeles en formato array unidimensional.
// Procesamiento de Píxeles:

// El bucle recorre el array de píxeles de 4 en 4, ya que cada píxel tiene 4 valores (R, G, B, A).
// Dependiendo del efecto seleccionado (gris, negativo, umbral), el código procesa los valores de los canales R, G y B.
// Escala de Grises:

// Calcula el promedio de los valores RGB y asigna el mismo valor a los tres canales, creando un efecto de escala de grises.
// Efecto Negativo:

// Invertimos los valores de los canales RGB restándolos de 255, generando el negativo del color.
// Efecto Umbral:

// Si el valor del canal Rojo es menor que 100, asigna negro (0) a los canales RGB.
// Si es mayor o igual a 100, asigna blanco (255) a los canales RGB.
// Este efecto crea un contraste fuerte, eliminando gradaciones intermedias de color.
// Salida de Datos:

// Una vez procesados todos los píxeles, el array actualizado (datos.data) se envía de vuelta al hilo principal mediante postMessage.
// Mensajes de Consola:

// Los mensajes console.log permiten depurar el proceso y verificar cuándo el Worker comienza y finaliza su tarea.
// Notas:
// Modularidad:
// Puedes comentar/descomentar uno de los efectos (gris, negativo, umbral) según lo que desees aplicar.
// Optimización:
// Si necesitas aplicar varios efectos en cadena, puedes combinarlos o implementar una lógica para seleccionar dinámicamente el efecto deseado.