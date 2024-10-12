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
  console.log("Worker arrancado con boton");
  const datos = event.data.data;
  const effect = event.data.effect;

  for (let i = 0; i < datos.length; i += 4) { // Recorro cada píxel
      if (effect === 'negative') {
          // Invertir los valores de los canales RGB
          datos[i] = 255 - datos[i];     // Rojo
          datos[i + 1] = 255 - datos[i + 1]; // Verde
          datos[i + 2] = 255 - datos[i + 2]; // Azul
      } else if (effect === 'sepia') {
          // Extraigo los valores de los canales RGB
          let r = datos[i];
          let g = datos[i + 1];
          let b = datos[i + 2];

          // Aplicar la transformación sepia
          datos[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189)); // Rojo
          datos[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168)); // Verde
          datos[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131)); // Azul
      }
  }

  postMessage(datos); // Devolvemos los datos modificados al hilo principal
};