onmessage = function(datos) {  // Define una función para manejar los mensajes entrantes desde el hilo principal
  console.log("Hola soy el núcleo", datos.data); // Muestra un mensaje con el índice del núcleo (recibido del mensaje inicial)

  // Define una variable `numero` con un valor inicial
  let numero = 1.0000000054;

  // Define el número de iteraciones para realizar una operación intensiva
  let iteraciones = 10000000000;

  // Realiza un bucle que simula una carga de trabajo intensiva
  for (let i = 0; i < iteraciones; i++) {
      numero *= 1.000000000076; // Incrementa ligeramente el valor de `numero` en cada iteración
  }

  // Envía un mensaje de vuelta al hilo principal indicando que ha terminado su trabajo
  postMessage("ok soy el worker y vuelvo al proceso principal");
};


// Resumen de funcionalidad:
// Recepción del mensaje: El worker espera recibir un mensaje desde el hilo principal mediante onmessage.
// En este caso, recibe el índice del núcleo y lo imprime en la consola.
// Simulación de carga intensiva: Realiza un cálculo matemático intensivo multiplicando repetidamente un número pequeño por un valor cercano a 1.
// Este cálculo se repite 10,000,000,000 veces, simulando una tarea que consume tiempo y recursos del procesador.
// Envío de respuesta: Una vez completado el cálculo, el worker envía un mensaje de vuelta al hilo principal mediante postMessage.
// Uso principal:
// Este tipo de worker es útil para manejar tareas computacionalmente intensivas en paralelo, evitando bloquear el hilo principal de la aplicación, lo que mejora el rendimiento y la experiencia del usuario en aplicaciones web.