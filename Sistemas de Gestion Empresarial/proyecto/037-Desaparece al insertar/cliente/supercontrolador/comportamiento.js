/////////////////////////////////// VARIABLES GLOBALES DEL PROGRAMA /////////////////////////////////////////////

var columnas_tabla = []                                             // Creo una variable global para almacenar las columnas

/////////////////////////////////// VARIABLES GLOBALES DEL PROGRAMA /////////////////////////////////////////////

window.onload = function(){
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
    
    fetch("../../servidor/lista_tablas.php")                        // LLamo a un microservicio que me da la lista de tablas
        .then(response => {
          return response.json();                                   // Quiero que el servidor me devuelva un json
        })
        .then(datos => {
            let menu = document.querySelector("nav ul")             // Selecciono el menu donde voy a poner las entradas dinamicas
            datos.forEach(function(tabla){                          // Para cada una de las tablas que han venido de la base de datos
                let nombre_de_la_tabla = tabla['Tables_in_crimson'];    // Atrapo el nombre de la tabla que viene del fetch
                let elemento = document.createElement("li")         // Creo en memoria un nuevo elemento li
                elemento.textContent = nombre_de_la_tabla           // A ese elemento li le pongo como texto el nombre de la tabl
                elemento.onclick = function(){                      // Cuando hago click en los elementos de la tabla
                    let texto = this.textContent                    // Atrapo el texto del elemento de navegacion
                    cargaDatosTabla(texto)                          // Y lo paso como parametro a la llamada que carga los datos de la tabla
                }
                menu.appendChild(elemento)                          // Lo añado al menú
                
            })
        })
    
    /////////////////////////////////// LISTADO DE TABLAS /////////////////////////////////////////////
     
    cargaDatosTabla("clientes")                                 // Cuando arranca el programa, le pongo una tabla por defecto
    
    /////////////////////////////////// CLICK VENTANA MODAL PARA INSERTAR /////////////////////////////////////////////
    
    document.querySelector("#insertar").onclick = function(){
        document.querySelector("#modal").style.display = "block"
        document.querySelector("#modal").classList.remove("desaparece")
        document.querySelector("#modal").classList.add("aparece")
    }
    document.querySelector("#modal").onclick = function(){
        
        document.querySelector("#modal").classList.remove("aparece")
        document.querySelector("#modal").classList.add("desaparece")
        setTimeout(function(){
            document.querySelector("#modal").style.display = "none"
        },1000)
    }
    document.querySelector("#contienemodal").onclick = function(event){
        event.stopPropagation()
    }
}

/////////////////////////////////// CREO UNA FUNCIÓN PARA CARGAR DINÁMICAMENTE TABLAS /////////////////////////////////////////////

function cargaDatosTabla(tabla){
   let campoclave;                                                          // Creo  una variable que va a almacenar el nombre del campo que es clave primaria
   /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
    
    fetch("../../servidor/columnas_tabla.php?tabla="+tabla)                 // LLamo a un microservicio que me da la lista de tablas y le paso la tabla como parametro
        .then(response => {
          return response.json();                                           // Quiero que el servidor me devuelva un json
        })
        .then(datos => {
            columnas_tabla = []                                             // Vacía las columnas anteriores para cargar solo las nuevas
            let cabeceras_tabla = document.querySelector("table thead tr"); // Selecciono donde tengo que poner las cabeceras en la tabla
            cabeceras_tabla.innerHTML = ""                                  // Por si acaso hay columnas previamente cargadas, vacio la cabecera
            datos.forEach(function(dato){                                   // PAra cada uno de los datos
                let elemento = document.createElement("th")                 // Creo un elemento que es una cabecera de tabla
                columnas_tabla.push(dato['Field'])                          // Al listado de columnas le añades la columna actual
                elemento.textContent = dato['Field']                        // Su texto es el nombre del campo de la base de datos
                cabeceras_tabla.appendChild(elemento)                       // Añado ese elemento a las cabeceras de la tabla
                if(dato['Key'] == "PRI"){                                   // Si este campo es clave primaria
                    campoclave = dato['Field']                              // en ese caso, recordamos cual es el nombre del campo que hace de clave primaria
                }
            })
            let elemento = document.createElement("th") 
            cabeceras_tabla.appendChild(elemento) 
            console.log(columnas_tabla);
            
                /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
                let coleccioncampos = []; // Creo una colección vacía para almacenar los campos de entrada del formulario.

                let contiene_modal = document.querySelector("#contienemodal"); // Selecciono el contenedor del modal.
                contiene_modal.innerHTML = `<h1>Formulario de inserción: ${tabla}</h1>`; // Establezco el título del formulario y vacio el contenido previo.
                
                let seccion = document.createElement("section"); // Creo una sección donde se añadirán los campos de entrada.
                
                // Recorro cada columna de la tabla para crear un campo de entrada correspondiente.
                columnas_tabla.forEach(function(columna) {
                    let contenedor = document.createElement("div"); // Creo un contenedor para cada campo.
                    let texto = document.createElement("p"); // Creo un elemento de texto para describir el campo.
                    texto.textContent = `Inserta un nuevo elemento para: ${columna}`; // Texto explicativo del campo.
                    contenedor.appendChild(texto); // Añado el texto al contenedor.
                
                    // Creo un campo de entrada (input) y lo añado a la colección de campos.
                    coleccioncampos.push(document.createElement("input"));
                    // Asigno un atributo "placeholder" al input con el nombre de la columna.
                    coleccioncampos[coleccioncampos.length - 1].setAttribute("placeholder", columna);
                    // Añado el campo de entrada al contenedor.
                    contenedor.appendChild(coleccioncampos[coleccioncampos.length - 1]);
                    // Añado el contenedor a la sección del formulario.
                    seccion.appendChild(contenedor);
                });
                
                contiene_modal.appendChild(seccion); // Añado la sección completa al contenedor del modal.
                
                let boton_enviar = document.createElement("button"); // Creo un botón para enviar el formulario.
                boton_enviar.textContent = "Enviar"; // Establezco el texto del botón.
                
                // Asigno una función al evento "click" del botón para procesar el formulario.
                boton_enviar.onclick = function() {
                    console.log("Vamos a procesar el formulario"); // Mensaje para indicar el inicio del proceso.
                    console.log(coleccioncampos); // Imprimo la colección de campos en la consola.
                
                    let mensaje = {}; // Creo un objeto vacío para almacenar los datos del formulario.
                
                    // Recorro cada campo de entrada para obtener su valor.
                    coleccioncampos.forEach(function(campo) {
                        // Asigno al objeto "mensaje" el valor del campo, usando el "placeholder" como clave.
                        mensaje[campo.getAttribute('placeholder')] = campo.value;
                    });
                
                    mensaje['tabla'] = tabla; // Añado el nombre de la tabla al objeto de mensaje.
                    console.log(mensaje); // Imprimo el mensaje en la consola.
                
                    // Hago una petición POST al servidor para insertar los datos.
                    fetch("../../servidor/insertar.php", {
                        method: 'POST', // Método POST para enviar datos.
                        headers: {
                            'Content-Type': 'application/json', // Indico que el contenido es JSON.
                        },
                        body: JSON.stringify(mensaje), // Convierto el mensaje a formato JSON.
                    })
                    .then(function(response) {
                        return response.text(); // Convierto la respuesta a texto.
                    })
                    .then(function(datos) {
                        console.log(datos); // Imprimo la respuesta del servidor.
                
                        // Oculto el modal después de enviar el formulario.
                        document.querySelector("#modal").classList.remove("aparece");
                        document.querySelector("#modal").classList.add("desaparece");
                        setTimeout(function() {
                            document.querySelector("#modal").style.display = "none";
                        }, 1000); // Espero un segundo antes de ocultar el modal completamente.
                    });
                };
                
                contienemodal.appendChild(boton_enviar); // Añado el botón de enviar al contenedor del modal.
                /////////////////////////////////// LISTADO DE COLUMNAS DE TABLA /////////////////////////////////////////////
            
            /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////
 
            fetch("../../servidor/datos_tabla.php?tabla="+tabla)                            // LLamo a un microservicio que me da la lista de tablas y le paso la tabla como parametro
                .then(response => {
                  return response.json();                                                   // Quiero que el servidor me devuelva un json
                })
                .then(datos => {
                    let contenidotabla = document.querySelector("section table tbody")      // Selecciono el contenido vacío de la tabla
                    contenidotabla.innerHTML = ""                                           // Vacio la tabla por si habia algo
                    
                    datos.forEach(function(registro){                                       // Como datos es un array, hago un forEach para repasarlo
                        let clave_primaria;
                        let nuevafila = document.createElement("tr")                        // Creo una nueva fila como un elemento html vacio
                        Object.keys(registro).forEach(clave => {                            // Fórmula para recorrer correctamente las propiedades de un objeto
                            if(clave == campoclave){                                        // Si este campo que estoy viendo ahora mismo es ademas la clave primaria
                                clave_primaria = registro[clave]                            // Pues guarda el numero de la clave primaria como identificador de registro
                            }
                            let nuevacolumna = document.createElement("td")                 // Creo una nueva columna html
                            nuevacolumna.textContent = registro[clave]                      // Le pongo el contenido en texto
                            nuevafila.appendChild(nuevacolumna)                             // Introduzco la columna dentro de la fila
                        })
                        let nuevacolumna = document.createElement("td")                     // Creo una nueva columna
                        nuevacolumna.textContent = "🗑️"                                     // Le doy el emoji de la papelera
                        nuevacolumna.setAttribute("claveprimaria",clave_primaria)           // Ademas le pongo un atributo que se llama claveprimaria y le pongo el valor correspondiente
                        nuevafila.appendChild(nuevacolumna)                                 // Lo pongo en las columnas
                        nuevacolumna.onclick = function(){                                  // Cuando haga click en la papelera
                            console.log("Vamos a eliminar algo")                            // Vamos a eliminar algo
                            let identificador = this.getAttribute("claveprimaria")          // tomo el identificador
                            fetch("../../servidor/eliminar_dato.php?tabla="+tabla+"&id="+identificador)     // Hago una petición a un microservicio para eliminar un registro
                            this.parentElement.remove()                                     // Ademas de enviar la peticion al servidor, elimino visualmente el elemento
                        }
                        contenidotabla.appendChild(nuevafila)                               // Introduzco la fila dentro de la tabla
                    })
                })
           
            /////////////////////////////////// CONTENIDO DE LA TABLA /////////////////////////////////////////////
            
            
            /////////////////////////////////// CONTENIDO DE LA VENTANA MODAL /////////////////////////////////////////////
        })
    
 }
 
 /////////////////////////////////// CREO UNA FUNCIÓN PARA CARGAR DINÁMICAMENTE TABLAS /////////////////////////////////////////////
