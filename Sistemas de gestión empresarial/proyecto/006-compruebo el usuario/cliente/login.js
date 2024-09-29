const datos_login = new Object();

window.onload = function(){
    console.log("Javascript cargado");
    document.querySelector("#usuario_login").onclick = function(){
      console.log("Has pulsado el boton");
      datos_login.usuario = document.querySelector("#usuario").value;
      datos_login.password= document.querySelector("#password").value;     
      console.log("Devuelvo un json:", datos_login);
        // Me conecto a un microservicio y le envío la información json en POST
        fetch("../servidor/loginusuario.php?usuario="+datos_login.usuario+"&password="+datos_login.password)
        .then(response => {
          return response.json();                       // Quiero que el servidor me devuelva un json
        })
        .then(datos_login => {
          console.log('Resultado:', datos_login);                // De momento voy a poner ese JSON en la consola simplemente para ver que la comunicacion es ok
        })
    }
}
