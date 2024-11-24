onmessage = function() { 
  // Este evento se activa cuando el Worker recibe un mensaje desde el hilo principal.

  let numero = 1.0000000054; 
  // Inicializa una variable con un número cercano a 1.

  let iteraciones = 100000000; 
  // Define el número de iteraciones para el cálculo intensivo.

  for (let i = 0; i < iteraciones; i++) { 
      // Inicia un bucle que se repetirá 100 millones de veces.
      numero *= 1.000000000076; 
      // Multiplica el número por un valor muy cercano a 1 en cada iteración.
  }

  postMessage("ok soy el worker y vuelvo al proceso principal"); 
  // Envía un mensaje de vuelta al hilo principal indicando que ha completado la tarea.
};


// Explicación del flujo:
// onmessage:

// El evento se activa cuando el hilo principal envía un mensaje al Worker utilizando postMessage.
// Cálculo intensivo:

// La operación matemática en el bucle (numero *= 1.000000000076) se realiza 100 millones de veces, simulando una tarea computacionalmente costosa.
// postMessage:

// Después de completar el bucle, el Worker envía un mensaje de vuelta al hilo principal para indicar que la tarea ha terminado.