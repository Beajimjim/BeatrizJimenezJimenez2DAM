// onmessage = function(datos){
//     console.log("worker arrancado con boton")
//     for(let i = 0;i<datos.data.length;i+=4){              // Recorro cada pixel
//         let c = datos.data                                  // Cargo los datos de ese pixel
//         for(let i = 0; i<100;i++){                      // Fuerzo miles de ćalculos más para apretar al procesador
//           c[i] *= 1.00000000045
//           c[i+1] *= 1.00000000045
//           c[i+2] *= 1.00000000045
//         }
//         let gris = Math.round((c[i] + c[i+1] + c[i+2])/3)   // Saco el promedio
        
//         datos.data[i] = gris;                               // actualizo el color rojo para que sea gris
//         datos.data[i+1] = gris;                             // actualizo el color verde para que sea gris
//         datos.data[i+2] = gris;                             // actualizo el color azul para que sea gris
//       }
//       //console.log(datos.data)
//       console.log("worker finalizado, devolvemos al hilo principal")
//      postMessage(datos.data)
// }





// onmessage = function(datos2) {
//   console.log("Worker arrancado sepia con boton");
//   let datos2 = datos2.data;  // Obtener los datos del evento

//   for (let i = 0; i < datos2.length; i += 4) {  // Recorro cada píxel
//       // Extraigo los valores de los canales RGB
//       let r = datos2[i];
//       let g = datos2[i + 1];
//       let b = datos2[i + 2];

//       // Aplicar la transformación sepia
//       let nuevoR = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
//       let nuevoG = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
//       let nuevoB = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));

//       // Asignar los nuevos valores de color
//       datos2[i] = nuevoR;     // Rojo
//       datos2[i + 1] = nuevoG; // Verde
//       datos2[i + 2] = nuevoB; // Azul
//       // Mantengo el canal alfa sin cambios (no lo modificamos)
//   }

//   console.log("Worker finalizado, devolvemos al hilo principal. Hola soy yo");
//   postMessage(datos2); // Devolvemos los datos modificados al hilo principal
// };


onmessage = function(event) {
    // Mensaje que indica que el Worker ha comenzado a procesar.
    console.log("Worker arrancado con boton");

    // Extrae los datos de los píxeles y el efecto deseado del mensaje recibido del hilo principal.
    const datos = event.data.data;
    const effect = event.data.effect;

    // Recorre cada píxel de la imagen. Cada píxel tiene 4 valores (rojo, verde, azul, alfa).
    for (let i = 0; i < datos.length; i += 4) { 
        if (effect === 'negative') {
            // Si el efecto seleccionado es 'negative', invierte los valores de los canales RGB.
            datos[i] = 255 - datos[i];         // Invertir el componente rojo.
            datos[i + 1] = 255 - datos[i + 1]; // Invertir el componente verde.
            datos[i + 2] = 255 - datos[i + 2]; // Invertir el componente azul.
        } else if (effect === 'sepia') {
            // Si el efecto seleccionado es 'sepia', transforma los valores de los canales RGB.
            
            // Extrae los valores actuales de los canales rojo, verde y azul.
            let r = datos[i];
            let g = datos[i + 1];
            let b = datos[i + 2];

            // Aplica la fórmula para el efecto sepia, calculando los nuevos valores RGB.
            datos[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)); // Nuevo valor del rojo.
            datos[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // Nuevo valor del verde.
            datos[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // Nuevo valor del azul.
        }
        // El canal alfa (datos[i+3]) no se modifica para conservar la transparencia.
    }

    // Envía los datos procesados de vuelta al hilo principal.
    postMessage(datos);
};


// Explicación del funcionamiento:
// Recepción de datos y efecto:

// El Worker recibe un mensaje desde el hilo principal con los datos de los píxeles y el tipo de efecto (negative o sepia).
// Los datos se extraen del mensaje (event.data.data) junto con el efecto deseado (event.data.effect).
// Aplicación del efecto:

// Si el efecto es negative, invierte los valores RGB de cada píxel para generar el efecto negativo.
// Si el efecto es sepia, transforma los valores RGB aplicando la fórmula del efecto sepia.
// Transformación de los datos:

// En ambos efectos, los valores calculados se aseguran de no exceder 255 (el máximo para un canal de color) usando Math.min.
// Devolución de los datos:

// Una vez procesados todos los píxeles, los datos modificados se envían de vuelta al hilo principal mediante postMessage(datos).
// Diferencias clave con versiones anteriores:
// Efectos dinámicos: En esta versión, el tipo de efecto (negative o sepia) es dinámico, determinado por el mensaje recibido.
// Reutilización del código: No es necesario escribir una función separada para cada efecto; la selección del efecto se maneja con un if-else.
// Canal alfa intacto: El canal de transparencia (alpha) de cada píxel no se modifica para preservar la opacidad original de la imagen.
// Este diseño hace que el Worker sea flexible y eficiente, ya que puede aplicar múltiples efectos dependiendo de la configuración enviada desde el hilo principal.