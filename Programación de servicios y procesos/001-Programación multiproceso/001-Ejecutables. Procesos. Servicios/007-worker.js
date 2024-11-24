onmessage = function() { 
  // Este evento se activa cuando el Worker recibe un mensaje desde el hilo principal.

  let numero = 1.0000000054; 
  // Inicializa una variable con un número cercano a 1, que será utilizado para los cálculos.

  let iteraciones = 10000000000; 
  // Define el número de iteraciones para el cálculo intensivo. 
  // Aquí se especifica un número muy alto para simular una tarea pesada.

  for (let i = 0; i < iteraciones; i++) { 
      // Inicia un bucle que se repetirá 10 mil millones de veces.
      numero *= 1.000000000076; 
      // Multiplica el número por un valor ligeramente mayor a 1 en cada iteración, simulando una operación intensiva.
  }

  postMessage("ok soy el worker y vuelvo al proceso principal"); 
  // Envía un mensaje de vuelta al hilo principal indicando que el cálculo ha terminado.
};

// Explicación:
// onmessage:

// Este evento permite que el Worker reciba mensajes del hilo principal mediante postMessage.
// Aquí, el Worker inicia la tarea al ser notificado por el hilo principal.
// Cálculo intensivo:

// El bucle realiza 10 mil millones de multiplicaciones, lo que simula una tarea que podría bloquear el hilo principal si no se realizara en un Worker.
// postMessage:

// Este método envía datos de vuelta al hilo principal. En este caso, el mensaje indica que el Worker ha completado su tarea.