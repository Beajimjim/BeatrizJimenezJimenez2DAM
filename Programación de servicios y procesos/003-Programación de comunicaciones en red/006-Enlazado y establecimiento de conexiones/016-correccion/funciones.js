// Función que comprime una colección de datos RGBA
function comprimir(coleccion) {
	// Quitamos la transparencia (canal Alpha) y combinamos los valores de color RGB en un solo entero
	const sintransparencia = [];
	for (let i = 0; i < coleccion.length; i += 4) { // Iteramos cada pixel (en bloques de 4 valores: R, G, B, A)
		const rojo = coleccion[i];          // Componente rojo del pixel
		const verde = coleccion[i + 1];    // Componente verde del pixel
		const azul = coleccion[i + 2];     // Componente azul del pixel
		// Convertimos RGB en un solo valor usando desplazamientos de bits
		sintransparencia.push((rojo << 16) + (verde << 8) + azul);
	}

	// Aplicamos compresión RLE a los valores convertidos
	const comprimido = rleCompressArray(sintransparencia);
	return comprimido; // Retornamos los datos comprimidos
}

// Función que descomprime una colección de datos comprimidos
function descomprimir(coleccion) {
	// Aplicamos descompresión RLE para recuperar los datos originales (sin transparencia)
	const desrle = rleDecompressArray(coleccion);

	// Creamos un array nuevo para reconstruir los datos en formato RGBA
	const descomprimido = new Uint8ClampedArray(desrle.length * 4); // Multiplicamos por 4 para RGBA
	let j = 0;

	// Iteramos los valores descomprimidos y los separamos en componentes RGB
	for (let i = 0; i < desrle.length; i++) {
		descomprimido[j++] = (desrle[i] >> 16) & 255; // Recuperamos el valor rojo
		descomprimido[j++] = (desrle[i] >> 8) & 255;  // Recuperamos el valor verde
		descomprimido[j++] = desrle[i] & 255;         // Recuperamos el valor azul
		descomprimido[j++] = 255;                     // Añadimos el canal Alpha con valor fijo (255 - opaco)
	}
	return descomprimido; // Retornamos el array RGBA reconstruido
}

// Función de compresión RLE (Run-Length Encoding)
function rleCompressArray(arr) {
	const compressed = []; // Array para almacenar los datos comprimidos
	let count = 1;         // Contador de repeticiones
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] === arr[i - 1]) { // Si el valor actual es igual al anterior
			count++;                // Incrementamos el contador
		} else {
			// Guardamos el valor y la cantidad de repeticiones
			compressed.push([arr[i - 1], count]);
			count = 1; // Reiniciamos el contador
		}
	}
	// Añadimos el último grupo de valores
	compressed.push([arr[arr.length - 1], count]);
	return compressed; // Retornamos el array comprimido
}

// Función de descompresión RLE (Run-Length Decoding)
function rleDecompressArray(compressed) {
	const decompressed = []; // Array para almacenar los datos descomprimidos
	for (let i = 0; i < compressed.length; i++) {
		const [value, count] = compressed[i]; // Desempaquetamos el valor y el número de repeticiones
		for (let j = 0; j < count; j++) {
			decompressed.push(value); // Añadimos el valor repetido 'count' veces
		}
	}
	return decompressed; // Retornamos el array descomprimido
}


// Explicación detallada de cada función:
// comprimir(coleccion)

// Convierte los valores RGBA de la imagen en enteros RGB eliminando la transparencia.
// Luego aplica la compresión RLE para reducir el tamaño de los datos eliminando redundancias.
// descomprimir(coleccion)

// Invierte el proceso de compresión:
// Primero descomprime los datos usando RLE.
// Luego separa cada entero RGB en sus componentes (Rojo, Verde, Azul) y añade un canal Alpha (255).
// rleCompressArray(arr)

// Aplica el algoritmo Run-Length Encoding (RLE):
// Agrupa valores repetidos en pares [valor, número de repeticiones].
// rleDecompressArray(compressed)

// Invierte el proceso de compresión RLE:
// Reconstruye el array expandiendo los valores según el número de repeticiones.
// Uso de desplazamientos de bits (<< y >>)

// Se utiliza para combinar o extraer componentes RGB de un entero:
// (rojo << 16) coloca el valor de rojo en los bits más significativos.
// (verde << 8) coloca el valor de verde en el medio.
// (azul) ocupa los bits menos significativos.
// Para extraer los colores:
// (valor >> 16) & 255 recupera el rojo.
// (valor >> 8) & 255 recupera el verde.
// (valor) & 255 recupera el azul.
// Aplicaciones prácticas:
// Optimización de datos: Este método reduce el tamaño de imágenes con áreas de color repetitivo.
// Transmisión eficiente: Ideal para enviar imágenes comprimidas a través de redes con ancho de banda limitado.
// Reconstrucción de imágenes: Permite restaurar datos comprimidos sin pérdida significativa de calidad visual.