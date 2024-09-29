window.onload = function(){
    console.log("Login cargado");    
    document.querySelector("#send_usuario_login").onclick = function(){
        console.log("Has pulsado el boton");
        let usuario = document.querySelector("#usuario").value;
        let password = document.querySelector("#password").value;
        console.log("datos recogidos:",usuario,password);
        let envio = {"usuario":usuario,"password":password};
        console.log(envio);
    }
}
