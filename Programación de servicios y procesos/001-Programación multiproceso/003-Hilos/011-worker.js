// Función que se activa cuando el Worker recibe un mensaje del hilo principal
onmessage = function(datos) {
  console.log("worker arrancado, vamos a trabajar"); // Mensaje de inicio del Worker, útil para depuración

  // Iteramos sobre los píxeles de la imagen
  // Cada píxel tiene 4 valores consecutivos: R (Rojo), G (Verde), B (Azul), A (Alfa)
  for (let i = 0; i < datos.data.length; i += 4) { 
      let c = datos.data; // Referencia al array de datos de los píxeles

      // Calculamos el promedio de los valores R, G y B para convertir el píxel a escala de grises
      let gris = Math.round((c[i] + c[i + 1] + c[i + 2]) / 3);

      // Actualizamos los valores R, G y B del píxel con el valor promedio calculado (gris)
      datos.data[i] = gris;       // Canal Rojo
      datos.data[i + 1] = gris;   // Canal Verde
      datos.data[i + 2] = gris;   // Canal Azul

      // Nota: El canal Alfa (c[i + 3]) no se modifica, ya que no afecta al color visible
  }

  // Mensaje en la consola indicando que el procesamiento ha finalizado
  console.log("worker finalizado, devolvemos al hilo principal");

  // Enviamos el array de datos procesados de vuelta al hilo principal
  postMessage(datos.data);
};


// Explicación Detallada:
// onmessage:

// Este evento se ejecuta cuando el hilo principal envía un mensaje al Worker.
// En este caso, los datos recibidos (datos.data) contienen un array de píxeles que representan una sección de la imagen en formato RGBA.
// Iteración sobre los Píxeles:

// La imagen está representada como un array unidimensional de valores RGBA, donde cada píxel ocupa 4 posiciones consecutivas:
// c[i]: Componente Rojo (R).
// c[i + 1]: Componente Verde (G).
// c[i + 2]: Componente Azul (B).
// c[i + 3]: Componente Alfa (A, transparencia).
// El bucle avanza de 4 en 4 para procesar cada píxel.
// Conversión a Escala de Grises:

// El promedio (R + G + B) / 3 se calcula para determinar el nivel de gris correspondiente al píxel.
// Este valor se asigna a los tres canales de color (R, G y B), reemplazando sus valores originales.
// Canal Alfa:

// El canal Alfa (c[i + 3]) no se modifica en este código, lo que significa que la transparencia del píxel se mantiene igual.
// postMessage:

// Una vez que todos los píxeles han sido procesados, el array actualizado se envía de vuelta al hilo principal mediante postMessage.
// Esto permite que el hilo principal actualice la imagen en el canvas con los nuevos datos.
// Mensajes de Consola:

// Los mensajes console.log ayudan a depurar el proceso y verificar cuándo el Worker comienza y finaliza su tarea.
// Beneficios:
// Eficiencia:
// Al usar un Worker, el procesamiento se realiza en un hilo separado, manteniendo la interfaz del navegador responsiva.

// Escalabilidad:
// Puedes modificar este código para aplicar otros efectos, como sepia o negativo, simplemente ajustando el cálculo dentro del bucle.

// Mejoras Opcionales:
// Manejo del Canal Alfa:
// Si necesitas modificar la opacidad, puedes incluir lógica para procesar c[i + 3].

// Optimización:
// Si estás procesando una imagen grande, dividirla en bloques y enviarlos a múltiples Workers puede acelerar el procesamiento.