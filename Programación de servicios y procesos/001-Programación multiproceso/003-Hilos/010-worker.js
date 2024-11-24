// Función que se activa cuando el Worker recibe datos enviados desde el hilo principal
onmessage = function(datos) {
  console.log("worker arrancado, vamos a trabajar"); // Mensaje que indica que el Worker ha iniciado su tarea

  // Recorremos todos los píxeles de la imagen
  // Cada píxel está compuesto por 4 valores consecutivos en el array: R (Rojo), G (Verde), B (Azul), A (Alfa)
  for (let i = 0; i < datos.data.length; i += 4) { 
      let c = datos.data; // Referencia al array que contiene los valores de los píxeles

      // Calculamos el promedio de los valores R, G y B para convertir el píxel a escala de grises
      let gris = Math.round((c[i] + c[i + 1] + c[i + 2]) / 3);

      // Asignamos el valor promedio (gris) a los canales R, G y B
      datos.data[i] = gris;       // Actualizamos el valor del canal Rojo
      datos.data[i + 1] = gris;   // Actualizamos el valor del canal Verde
      datos.data[i + 2] = gris;   // Actualizamos el valor del canal Azul
      // El valor del canal Alfa (datos.data[i + 3]) no se modifica, ya que no afecta al color visible
  }

  // Mensaje en consola para indicar que el Worker ha finalizado su tarea
  console.log("worker finalizado, devolvemos al hilo principal");

  // Enviamos los datos procesados de vuelta al hilo principal
  postMessage(datos.data);
};


// Explicación Detallada:
// onmessage:

// Este evento se activa automáticamente cuando el hilo principal envía datos al Worker.
// En este caso, los datos enviados contienen los valores de los píxeles de la imagen (datos.data), que se procesarán para aplicar un efecto de escala de grises.
// Iteración sobre los Píxeles:

// La imagen se representa como un array unidimensional de valores RGBA, donde cada píxel ocupa 4 posiciones consecutivas en el array:
// c[i]: Componente Rojo (R).
// c[i + 1]: Componente Verde (G).
// c[i + 2]: Componente Azul (B).
// c[i + 3]: Componente Alfa (A, transparencia).
// El bucle avanza de 4 en 4 para procesar cada píxel de la imagen.
// Escala de Grises:

// El cálculo (R + G + B) / 3 obtiene el promedio de los tres canales de color (Rojo, Verde y Azul), generando un valor que representa el tono de gris equivalente.
// Este valor se asigna a los tres canales (R, G, B) para obtener el efecto de escala de grises.
// Canal Alfa:

// El canal Alfa (c[i + 3]), que controla la transparencia del píxel, no se modifica, ya que no afecta a la conversión a escala de grises.
// postMessage:

// Una vez que todos los píxeles han sido procesados, el array actualizado (datos.data) se envía de vuelta al hilo principal mediante postMessage.
// Esto permite que el hilo principal actualice la imagen en el canvas con los nuevos datos.
// Mensajes de Consola:

// Los mensajes console.log ayudan a depurar el proceso, indicando cuándo el Worker ha comenzado y finalizado su tarea.
// Beneficios:
// Paralelismo:
// Este enfoque utiliza un Web Worker para realizar el procesamiento en un hilo separado, evitando bloquear el hilo principal y manteniendo la interfaz del navegador responsiva.

// Escalabilidad:
// Puedes extender este código para aplicar otros efectos (como sepia o negativo) modificando la lógica del cálculo dentro del bucle.