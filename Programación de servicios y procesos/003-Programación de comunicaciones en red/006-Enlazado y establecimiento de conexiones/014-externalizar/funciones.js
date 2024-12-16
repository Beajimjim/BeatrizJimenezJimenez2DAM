function comprimir(coleccion) {
    //////////////////////	PRIMERO QUITO LA TRANSPARENCIA	//////////////////////
    
    const sintransparencia = []; // Creo un array vacío para almacenar los valores RGB sin transparencia
    for (let i = 0; i < coleccion.length; i += 4) { // Recorro el array de datos de píxeles saltando de 4 en 4 (RGBA)
        // Unifico los valores RGB en un único número entero, ignorando el canal Alfa (transparencia)
        sintransparencia.push(coleccion[i] * 255 * 255 + coleccion[i + 1] * 255 + coleccion[i + 2]);
    }

    //////////////////////	LUEGO COMPRIMO RLE	//////////////////////

    // Aplico compresión RLE (Run-Length Encoding) al array sin transparencia
    const comprimido = rleCompressArray(sintransparencia);
    
    return comprimido; // Retorno el array comprimido
}

function descomprimir(coleccion) {
    // Primero descomprimo el array usando el método inverso de RLE
    const desrle = rleDecompressArray(coleccion);
    // Creo un nuevo array para almacenar los valores descomprimidos con formato RGBA
    const descomprimido = new Uint8ClampedArray(desrle.length * 4); // Multiplico por 4 para añadir Alfa
    let j = 0;

    for (let i = 0; i < desrle.length; i++) { // Recorro el array descomprimido sin transparencia
        descomprimido[j++] = (desrle[i] >> 16) & 255; // Extraigo el componente Rojo (R)
        descomprimido[j++] = (desrle[i] >> 8) & 255;  // Extraigo el componente Verde (G)
        descomprimido[j++] = desrle[i] & 255;         // Extraigo el componente Azul (B)
        descomprimido[j++] = 255;                     // Establezco el valor de Alfa en 255 (opaco)
    }

    return descomprimido; // Retorno el array descomprimido
}

function rleCompressArray(arr) {
    // Función para comprimir un array usando Run-Length Encoding
    const compressed = []; // Array donde almacenaré los valores comprimidos
    let count = 1; // Inicializo el contador en 1
    
    for (let i = 1; i < arr.length; i++) { // Recorro el array a partir del segundo elemento
        if (arr[i] === arr[i - 1]) { // Si el valor actual es igual al anterior
            count++; // Incremento el contador
        } else {
            compressed.push([arr[i - 1], count]); // Guardo el valor anterior y su conteo
            count = 1; // Reinicio el contador
        }
    }
    compressed.push([arr[arr.length - 1], count]); // Añado el último valor y su conteo
    return compressed; // Retorno el array comprimido
}

function rleDecompressArray(compressed) {
    // Función para descomprimir un array comprimido con Run-Length Encoding
    const decompressed = []; // Array donde almacenaré los valores descomprimidos
    
    for (let i = 0; i < compressed.length; i++) { // Recorro el array comprimido
        const [value, count] = compressed[i]; // Obtengo el valor y su conteo
        for (let j = 0; j < count; j++) { // Reproduzco el valor 'count' veces
            decompressed.push(value); // Añado el valor descomprimido al array
        }
    }
    
    return decompressed; // Retorno el array descomprimido
}

function insertar(arr, element) {
    // Función para insertar un elemento cada 4 posiciones (para RGBA)
    for (let i = 3; i < arr.length; i += 4) { // Itero cada 4 posiciones
        arr.splice(i, 0, element); // Inserto el elemento (Alfa) en la posición actual
        i++; // Incremento el índice para saltar la nueva posición añadida
    }
    return arr; // Retorno el array con los elementos insertados
}

// Explicación Detallada del Flujo
// comprimir:

// Se encarga de eliminar el canal de transparencia (Alfa) y luego aplicar compresión RLE para reducir el tamaño del array de píxeles.
// descomprimir:

// Realiza el proceso inverso a comprimir: descomprime el array comprimido con RLE y reconstruye un array con formato RGBA, añadiendo transparencia fija.
// rleCompressArray:

// Implementa Run-Length Encoding, un algoritmo de compresión sin pérdida que agrupa valores consecutivos iguales junto con su conteo.
// rleDecompressArray:

// Descomprime un array codificado con RLE, reproduciendo los valores según su conteo.
// insertar:

// Inserta un valor adicional (como transparencia) cada cuatro posiciones para convertir un array RGB en formato RGBA.