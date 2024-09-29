let datos_login = new Object();

window.onload = function(){
    console.log("Javascript cargado");
    document.querySelector("#usuario_login").onclick = function(){
      console.log("Has pulsado el boton");
      datos_login.usuario = document.querySelector("#usuario").value;
      datos_login.password = document.querySelector("#password").value;
      console.log("Devuelvo un json:", datos_login);
        // Me conecto a un microservicio y le envío la información json en POST
        fetch("../servidor/loginusuario.php?usuario="+datos_login.usuario+"&password="+datos_login.password)
        .then(response => {
          return response.json();                       // Quiero que el servidor me devuelva un json
        })
        .then(datosRespuestaFetch => {                                   //esta respuesta solo me da el usuario, ningun dato mas de la tabla. No puedo intetar mostrar ninguno de los demas datos
          console.log('Resultado:', datosRespuestaFetch);               // De momento voy a poner ese JSON en la consola simplemente para ver que la comunicacion es ok
          if(datosRespuestaFetch.resultado == 'ok'){                   // En el caso de que el login sea satisfactorio
            console.log("Entras correctamente")
            localStorage.setItem('appsge_usuario', datosRespuestaFetch.usuario);     // Ahora necesito un mencanismo para que el cliente recuerde quien soy
                           
            document.querySelector("#login_correct").innerHTML = "Usuario correcto. Redirigiendo en 5 segundos...";   // Escribo un mensaje de ok
            setTimeout(function(){            
              window.location = "escritorio/index.html";                           // Me voy al escritorio                 
            },5000)
          }else{
            console.log("Error al entrar")
           
            document.querySelector("#login_incorrect").innerHTML = "Usuario incorrecto. Redirigiendo en 5 segundos...";
            setTimeout(function(){
                window.location = window.location;
            },5000)
          }
        })
    }
}


//datosRespuestaFetch => una vez que hemos llegado a base de datos y hecho la peticion, solo va a devolvernos el campo usuario. Esto se debe a que en el loginusuario.php
// le hemos dicho que solo se traiga eso cuando haga la peticion y encuentre un usuario y contraseña que coincidan con lo introducido en el login.
//Por ello, cuando llegamos a este punto "datosRespuestaFetch", no podemos intentar mostrar ningun dato más como la contraseña porque no nos lo hemos traido.