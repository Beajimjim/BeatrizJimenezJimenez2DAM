// Evento que se activa cuando el Worker recibe datos desde el hilo principal
onmessage = function(datos) {
  console.log("worker arrancado, vamos a trabajar"); // Mensaje para confirmar que el Worker ha iniciado

  // Iteramos sobre todos los píxeles de la imagen
  // Cada píxel tiene 4 valores consecutivos: R (Rojo), G (Verde), B (Azul), A (Alfa)
  for (let i = 0; i < datos.data.length; i += 4) { 
      let c = datos.data; // Referencia al array de datos de los píxeles

      // Este bucle interno realiza cálculos adicionales para generar carga en el procesador
      // Multiplica los valores RGB por un factor muy cercano a 1, simulando un procesamiento intensivo
      for (let j = 0; j < 100; j++) { 
          c[i] *= 1.00000000045;     // Ajusta el valor del canal Rojo
          c[i + 1] *= 1.00000000045; // Ajusta el valor del canal Verde
          c[i + 2] *= 1.00000000045; // Ajusta el valor del canal Azul
      }

      // Calculamos el promedio de los valores RGB para convertir el píxel a escala de grises
      let gris = Math.round((c[i] + c[i + 1] + c[i + 2]) / 3);

      // Asignamos el valor promedio (gris) a los canales R, G y B para obtener un tono de gris
      datos.data[i] = gris;       // Canal Rojo
      datos.data[i + 1] = gris;   // Canal Verde
      datos.data[i + 2] = gris;   // Canal Azul
      // El canal Alfa (datos.data[i + 3]) no se modifica
  }

  // Mensaje para indicar que el Worker ha terminado el procesamiento
  console.log("worker finalizado, devolvemos al hilo principal");

  // Envía los datos procesados de vuelta al hilo principal
  postMessage(datos.data);
};


// Explicación Detallada:
// onmessage:

// Este evento se ejecuta cuando el hilo principal envía datos al Worker.
// Aquí, los datos recibidos son un array que representa los píxeles de la imagen en formato RGBA.
// Iteración sobre los Píxeles:

// Cada píxel está representado por 4 valores consecutivos: Rojo (R), Verde (G), Azul (B) y Alfa (A).
// El bucle principal salta de 4 en 4 para procesar cada píxel individualmente.
// Carga Artificial del Procesador:

// El bucle interno (for (let j = 0; j < 100; j++)) multiplica repetidamente los valores de los canales RGB por un pequeño factor (1.00000000045).
// Esto simula una tarea intensiva en términos de cálculos, aunque no tiene un efecto visible en los datos procesados.
// Escala de Grises:

// Se calcula el promedio de los valores de los canales R, G y B: (R + G + B) / 3.
// Este promedio se asigna a los tres canales para transformar el color del píxel a un tono de gris.
// Envío de los Datos Procesados:

// Una vez que todos los píxeles han sido procesados, el array actualizado se envía de vuelta al hilo principal mediante postMessage.
// Notas:
// Canal Alfa:
// El canal Alfa (datos.data[i + 3]) no se modifica, pero puedes ajustarlo si necesitas cambiar la transparencia de los píxeles.

// Optimización:
// Si no necesitas simular una carga de trabajo pesada, puedes eliminar el bucle interno (for (let j = 0; j < 100; j++)) para mejorar el rendimiento.

// Escala de Grises:
// Este es un método básico para convertir una imagen a escala de grises. Si necesitas implementar otros efectos (como sepia o negativo), se pueden añadir al código.