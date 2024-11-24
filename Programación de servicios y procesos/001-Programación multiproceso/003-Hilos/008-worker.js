// Función que se activa cuando el Worker recibe datos del hilo principal
onmessage = function(datos) {
  console.log("worker arrancado, vamos a trabajar"); // Mensaje de inicio del Worker para seguimiento en la consola

  // Iteramos sobre todos los píxeles de la imagen
  // Cada píxel tiene 4 valores consecutivos en el array: R (Rojo), G (Verde), B (Azul), A (Alfa)
  for (let i = 0; i < datos.data.length; i += 4) { 
      let c = datos.data; // Referencia al array de datos de píxeles

      // Ciclo que fuerza miles de cálculos adicionales para sobrecargar el procesador
      // Este bucle interno multiplica los valores RGB por un factor mínimo para simular una tarea pesada
      for (let i = 0; i < 100; i++) {
          c[i] *= 1.00000000045;     // Multiplica el canal Rojo por un factor
          c[i + 1] *= 1.00000000045; // Multiplica el canal Verde por el mismo factor
          c[i + 2] *= 1.00000000045; // Multiplica el canal Azul por el mismo factor
      }

      // Calculamos el promedio de los valores Rojo, Verde y Azul para convertir el píxel a escala de grises
      let gris = Math.round((c[i] + c[i + 1] + c[i + 2]) / 3);

      // Actualizamos los valores RGB del píxel con el promedio calculado (escala de grises)
      datos.data[i] = gris;       // Canal Rojo
      datos.data[i + 1] = gris;   // Canal Verde
      datos.data[i + 2] = gris;   // Canal Azul
      // El canal Alfa (datos.data[i + 3]) no se modifica, ya que no afecta al color visible
  }

  // Registro en la consola indicando que el Worker ha terminado su tarea
  console.log("worker finalizado, devolvemos al hilo principal");

  // Envía los datos procesados de vuelta al hilo principal
  postMessage(datos.data);
};


// Explicación Detallada:
// onmessage:
// Este evento se activa cuando el hilo principal envía datos al Worker. Los datos suelen incluir el array de píxeles de la imagen (datos.data).

// Iteración de Píxeles:

// El bucle for principal recorre cada píxel en el array de datos.
// Se salta de 4 en 4 porque cada píxel está representado por 4 valores consecutivos: R, G, B, A.
// Carga de Trabajo Artificial:

// El bucle interno realiza cálculos innecesarios (multiplicaciones mínimas) para simular una carga pesada sobre el procesador.
// Esto es útil para probar el impacto de optimizaciones o medir el rendimiento en condiciones de estrés.
// Cálculo de Escala de Grises:

// El promedio de los valores RGB ((R + G + B) / 3) convierte los colores del píxel en un tono de gris.
// Este promedio se asigna a los tres canales (R, G, B) para obtener la escala de grises.
// postMessage:

// Envía el array de datos procesados de vuelta al hilo principal, donde se reflejarán los cambios en el canvas.
// Mensajes de Consola:

// Los mensajes console.log son útiles para depurar y verificar que el Worker ha sido iniciado y finalizado correctamente.
// Notas Adicionales:
// Optimización:
// El bucle interno con 100 iteraciones puede eliminarse para reducir la carga artificial si no se necesita para pruebas de rendimiento.

// Canal Alfa:
// El canal alfa (datos.data[i + 3]) no se modifica, pero puede ajustarse si es necesario (por ejemplo, para cambiar la opacidad del píxel).