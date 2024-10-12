onmessage = function(event) {
    // Desestructuramos los datos del evento, extrayendo la información de la imagen y el efecto a aplicar
    const { datos, efecto } = event.data;  
    const longitud = datos.length; // Almacenamos la longitud del array de datos

    // Iteramos a través de los datos de píxeles. Los datos están organizados en grupos de 4 (RGBA)
    for (let i = 0; i < longitud; i += 4) {
        // Extraemos los valores de rojo, verde y azul del píxel actual
        let r = datos[i];     // Componente rojo
        let g = datos[i + 1]; // Componente verde
        let b = datos[i + 2]; // Componente azul

        // Aplicamos el efecto según la elección
        if (efecto === "negativo") {
            // Para el efecto negativo, invertimos cada componente de color
            datos[i] = 255 - r;     // Rojo
            datos[i + 1] = 255 - g; // Verde
            datos[i + 2] = 255 - b; // Azul
        } else if (efecto === "sepia") {
            // Para el efecto sepia, aplicamos una transformación para dar un tono cálido
            datos[i] = (r * 0.393) + (g * 0.769) + (b * 0.189); // Nuevo valor para el rojo
            datos[i + 1] = (r * 0.349) + (g * 0.686) + (b * 0.168); // Nuevo valor para el verde
            datos[i + 2] = (r * 0.272) + (g * 0.534) + (b * 0.131); // Nuevo valor para el azul
        }
    }

    // Enviamos de vuelta los datos modificados al hilo principal
    postMessage(datos);
};