onmessage = function() { 
    // Este evento se activa cuando el Worker recibe un mensaje desde el hilo principal.
    
    console.log("ok hola"); 
    // Muestra un mensaje en la consola del Worker indicando que ha recibido un mensaje.

    postMessage("ok soy el worker y vuelvo al proceso principal"); 
    // Envía un mensaje de vuelta al hilo principal para notificar que el Worker ha procesado la tarea.
    // Este es el equivalente a un "return" en el contexto de los Workers.

    // Nota: Un Worker puede enviar múltiples mensajes al hilo principal mediante `postMessage`,
    // ya que no está limitado a un único retorno como en una función tradicional.
};

// Explicación:
// onmessage:

// Es el punto de entrada para los mensajes enviados desde el hilo principal al Worker.
// Cada vez que se recibe un mensaje, se ejecuta la función definida.
// console.log:

// Permite depurar el Worker mostrando un mensaje en la consola del navegador o en la consola de desarrollo.
// postMessage:

// Este método envía datos de vuelta al hilo principal, lo que permite la comunicación bidireccional.
// Nota Importante:

// Un Worker no tiene un "return" tradicional, pero se puede considerar que postMessage cumple esa función, ya que permite enviar datos al hilo principal.