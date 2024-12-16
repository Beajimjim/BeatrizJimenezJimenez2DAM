function comprimir(coleccion) {
    // Convertimos los valores RGBA en un solo valor RGB, eliminando la transparencia
    const sintransparencia = []; // Creamos un array vacío para almacenar los valores convertidos
    for (let i = 0; i < coleccion.length; i += 4) { // Recorremos el array saltando de 4 en 4 (cada pixel tiene 4 valores: R, G, B, A)
        const rojo = coleccion[i];          // Valor del canal rojo
        const verde = coleccion[i + 1];    // Valor del canal verde
        const azul = coleccion[i + 2];     // Valor del canal azul
        // Combinamos los valores RGB en un solo número utilizando desplazamientos de bits
        sintransparencia.push((rojo << 16) + (verde << 8) + azul);
    }

    // Compresión RLE (Run-Length Encoding) para comprimir los datos sin transparencia
    const comprimido = rleCompressArray(sintransparencia); // Llamamos a la función de compresión RLE
    return comprimido; // Retornamos los datos comprimidos
}

function descomprimir(coleccion) {
    // Descomprimimos los datos utilizando RLE
    const desrle = rleDecompressArray(coleccion); // Descomprimimos el array comprimido
    const descomprimido = new Uint8ClampedArray(desrle.length * 4); // Creamos un nuevo array para almacenar los datos descomprimidos con RGBA

    let j = 0; // Índice para recorrer el array descomprimido
    for (let i = 0; i < desrle.length; i++) {
        // Extraemos los valores RGB de cada número y agregamos el valor de transparencia (255)
        descomprimido[j++] = (desrle[i] >> 16) & 255; // Extraemos el valor rojo
        descomprimido[j++] = (desrle[i] >> 8) & 255;  // Extraemos el valor verde
        descomprimido[j++] = desrle[i] & 255;         // Extraemos el valor azul
        descomprimido[j++] = 255;                     // Asignamos transparencia fija
    }
    return descomprimido; // Retornamos el array descomprimido
}

function rleCompressArray(arr) {
    // Implementamos el algoritmo de compresión RLE (Run-Length Encoding)
    const compressed = []; // Creamos un array vacío para almacenar los datos comprimidos
    let count = 1; // Contador para rastrear repeticiones consecutivas

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] === arr[i - 1]) { // Si el valor actual es igual al anterior
            count++; // Incrementamos el contador
        } else {
            // Al encontrar un valor diferente, guardamos el valor actual y el contador
            compressed.push([arr[i - 1], count]);
            count = 1; // Reiniciamos el contador
        }
    }
    // Guardamos el último valor y su conteo
    compressed.push([arr[arr.length - 1], count]);
    return compressed; // Retornamos los datos comprimidos
}

function rleDecompressArray(compressed) {
    // Implementamos el algoritmo de descompresión RLE
    const decompressed = []; // Creamos un array vacío para almacenar los datos descomprimidos

    for (let i = 0; i < compressed.length; i++) {
        const [value, count] = compressed[i]; // Extraemos el valor y su conteo
        for (let j = 0; j < count; j++) {
            decompressed.push(value); // Añadimos el valor al array descomprimido tantas veces como indique el conteo
        }
    }
    return decompressed; // Retornamos el array descomprimido
}


// Descripción de las funciones:
// comprimir:

// Convierte los valores RGBA de cada píxel en un único valor RGB, eliminando la transparencia.
// Utiliza desplazamientos de bits para combinar los valores rojo, verde y azul en un solo número.
// Aplica la compresión RLE al array resultante para reducir la redundancia.
// descomprimir:

// Descomprime los datos utilizando RLE.
// Reconstruye los valores originales de RGB y añade un canal de transparencia (255) para cada píxel.
// rleCompressArray:

// Implementa la codificación RLE, que almacena cada valor junto con la cantidad de veces consecutivas que aparece.
// Reduce la redundancia en datos con valores repetidos.
// rleDecompressArray:

// Descomprime un array codificado con RLE, reconstruyendo el array original con valores repetidos según los conteos.
// Ejemplo de uso:
// Entrada:
// Un array RGBA con datos de imagen.
// Flujo:
// El array pasa por comprimir, eliminando la transparencia y aplicando compresión RLE.
// Luego, se descomprime con descomprimir para recuperar el array original.
// Salida:
// El array descomprimido será idéntico al original (pero con transparencia añadida como 255).
// Este código es útil para manejar datos gráficos, como imágenes o videos, en aplicaciones donde la transmisión de datos comprimidos es esencial para optimizar el rendimiento y reducir el ancho de banda.