<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <title>Texto Predictivo Neuronal</title>
  <style>
    /* Estilos generales del cuerpo */
    body {
      font-family: Arial, sans-serif;
      background: #1a1a1a; /* Fondo oscuro */
      color: white; /* Texto en color blanco */
      text-align: center; /* Alineación centrada */
      padding: 20px; /* Espaciado */
    }

    /* Estilos del cuadro de entrada de texto */
    input {
      border: 2px solid #444; /* Borde gris oscuro */
      background: #222; /* Fondo oscuro */
      color: white; /* Texto en color blanco */
      border-radius: 8px; /* Bordes redondeados */
      padding: 12px; /* Espaciado interno */
      font-size: 16px; /* Tamaño de fuente */
      width: 80%; /* Ancho ajustable */
      max-width: 400px; /* Máximo de 400px */
      outline: none; /* Quitar borde al seleccionar */
      margin-bottom: 10px; /* Espaciado inferior */
    }

    /* Cambio de color cuando el cuadro de texto está enfocado */
    input:focus {
      border-color: #88c057; /* Cambia a verde */
    }

    /* Contenedor de las neuronas */
    #neuronas {
      display: flex;
      flex-wrap: wrap; /* Permite que las neuronas se ajusten en varias líneas */
      justify-content: center; /* Centrar neuronas */
      margin-top: 10px; /* Espaciado superior */
    }

    /* Estilos de cada neurona */
    .neurona {
      width: 20px; /* Tamaño */
      height: 20px;
      border-radius: 50%; /* Hacerlas redondas */
      margin: 5px; /* Espaciado entre neuronas */
      background: #333; /* Color base de las neuronas */
      transition: all 0.3s; /* Suaviza el cambio */
      opacity: 0.2; /* Baja opacidad por defecto */
    }

    /* Clase para activar una neurona */
    .activo {
      background: #88c057; /* Cambia a verde cuando está activa */
      opacity: 1; /* Hace que se vea completamente */
    }

    /* Lista donde se mostrarán las sugerencias */
    #resultados {
      list-style: none; /* Quita los puntos de la lista */
      padding: 0;
      max-width: 400px; /* Máximo ancho */
      margin: 20px auto; /* Centrado */
      text-align: left; /* Alineación a la izquierda */
    }

    /* Estilos para cada sugerencia de la lista */
    #resultados li {
      background: #222; /* Fondo oscuro */
      padding: 10px; /* Espaciado interno */
      margin: 5px 0; /* Espaciado entre elementos */
      border: 1px solid #444; /* Borde gris */
      border-radius: 5px; /* Bordes redondeados */
      cursor: pointer; /* Cursor de selección */
      transition: background 0.2s; /* Transición de color */
      color: white; /* Texto en color blanco */
    }

    /* Efecto cuando el usuario pasa el mouse sobre una sugerencia */
    #resultados li:hover {
      background: #88c057; /* Fondo verde */
      color: black; /* Texto negro */
    }

    /* Área de salida donde se mostrará la predicción */
    #output {
      margin-top: 20px;
      font-size: 18px;
      background: #333;
      padding: 10px;
      border-radius: 8px;
      display: inline-block;
      min-width: 200px;
    }
  </style>
</head>
<body>

  <!-- Título principal de la página -->
  <h1>Texto Predictivo Neuronal</h1>

  <!-- Cuadro de texto donde el usuario escribe -->
  <input id="entrada" placeholder="Escribe aquí...">
  
  <!-- Contenedor de neuronas visuales -->
  <div id="neuronas"></div>

  <!-- Lista donde aparecerán las sugerencias de palabras -->
  <ul id="resultados"></ul>

  <!-- Div donde se mostrará el estado de las predicciones -->
  <div id="output">Esperando entrada...</div>

  <script>
    const entrada = document.getElementById("entrada");
    const listaResultados = document.getElementById("resultados");
    const outputDiv = document.getElementById("output");

    // Crear un contenedor de neuronas (de 'a' a 'z')
    const neuronasContainer = document.getElementById("neuronas");
    let neuronaMap = {}; // Diccionario para referenciar neuronas por letra

    for (let i = 97; i <= 122; i++) { // Código ASCII de 'a' a 'z'
      let neurona = document.createElement("div");
      neurona.className = "neurona"; // Asigna la clase
      neurona.id = "neurona" + i; // Asigna un ID único
      neuronasContainer.appendChild(neurona); // Añade al contenedor
      neuronaMap[String.fromCharCode(i)] = neurona; // Relaciona la neurona con su letra
    }

    /**
     * Función que realiza la búsqueda de predicciones en `predictivo2.php`
     */
    function procesa() {
      let texto = entrada.value.toLowerCase().trim(); // Convertir texto a minúsculas y eliminar espacios
      let palabras = texto.split(" "); // Separar en palabras
      let dosultimas = palabras.slice(-2).join(" ").trim(); // Obtener las últimas dos palabras

      // Si el usuario ha escrito menos de 2 caracteres, no se realiza búsqueda
      if (dosultimas.length < 2) return;

      let codificado = encodeURIComponent(dosultimas); // Codificar texto para la URL

      // Realizar la petición a `predictivo2.php`
      fetch("predictivo2.php?entrada=" + codificado)
        .then(response => {
          if (!response.ok) throw new Error("Error en la petición: " + response.statusText);
          return response.json();
        })
        .then(datos => {
          console.log("Predicciones:", datos); // Mostrar en consola para depuración

          listaResultados.innerHTML = ""; // Limpiar la lista de resultados

          if (datos.error) {
            outputDiv.textContent = "Sin predicciones."; // Indicar que no hay predicciones
          } 
          // Si hay predicciones disponibles, agregarlas a la lista
          else if (Array.isArray(datos.predicciones) && datos.predicciones.length > 0) {
            outputDiv.textContent = "Predicciones disponibles";

            datos.predicciones.forEach(palabra => {
              let item = document.createElement("li"); // Crear un elemento de lista
              item.textContent = palabra; // Asignar el texto de la predicción
              
              // Al hacer clic en una sugerencia, se agrega al texto del usuario
              item.addEventListener("click", () => {
                entrada.value += " " + palabra;
                listaResultados.innerHTML = ""; // Limpiar la lista tras la selección
                procesa(); // Buscar nuevas predicciones
              });

              listaResultados.appendChild(item); // Agregar el elemento a la lista
            });
          }

          activarNeuronas(texto); // Activar las neuronas basadas en el texto ingresado
        })
        .catch(error => console.error("Fetch error:", error)); // Capturar errores
    }

    /**
     * Función que activa las neuronas según el texto ingresado
     */
    function activarNeuronas(texto) {
      // Resetear todas las neuronas
      document.querySelectorAll(".neurona").forEach(neurona => {
        neurona.classList.remove("activo");
        neurona.style.opacity = "0.2";
      });

      // Activar neuronas según las letras ingresadas
      for (let i = 0; i < texto.length; i++) {
        let letra = texto[i];
        if (neuronaMap[letra]) {
          neuronaMap[letra].classList.add("activo"); // Activar neurona
          neuronaMap[letra].style.opacity = "1"; // Aumentar opacidad
        }
      }
    }

    // Ejecutar la búsqueda cada vez que el usuario escriba algo
    entrada.addEventListener("input", procesa);
  </script>
</body>
</html>
