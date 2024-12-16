from flask import Flask, render_template, request, jsonify
from correo import enviar_correo, recibir_correos

# Crear la aplicación Flask
app = Flask(__name__)

# Ruta principal para cargar la interfaz
@app.route("/")
def index():
    """
    Renderiza la plantilla `index.html`.
    Esta es la página principal de la aplicación donde el usuario interactúa con el cliente de correo.
    """
    return render_template("index.html")

# Ruta para enviar correos
@app.route("/enviar", methods=["POST"])
def enviar():
    """
    Endpoint para enviar correos.
    Recibe los datos en formato JSON desde una solicitud POST y llama a la función `enviar_correo` 
    para procesarlos y enviarlos.
    Devuelve una respuesta en formato JSON indicando el estado del envío.
    """
    # Obtener datos enviados por el cliente (JSON)
    data = request.get_json()
    asunto = data["asunto"]  # Título del correo
    para = data["para"]      # Destinatario
    mensaje = data["mensaje"]  # Contenido del correo
    
    # Llama a la función `enviar_correo` para realizar el envío
    resultado = enviar_correo(asunto, para, mensaje)
    
    # Devuelve el resultado como JSON
    return jsonify(resultado)

# Ruta para recibir correos
@app.route("/recibir", methods=["GET"])
def recibir():
    """
    Endpoint para obtener correos desde el servidor.
    Llama a la función `recibir_correos` para recuperar los mensajes y los devuelve como JSON.
    """
    correos = recibir_correos()  # Llama a la función para obtener los correos
    return jsonify(correos)  # Devuelve la lista de correos como JSON

# Punto de entrada principal de la aplicación
if __name__ == "__main__":
    """
    Configura y ejecuta el servidor Flask en modo de depuración.
    """
    app.run(host="127.0.0.1", port=5000, debug=True)  # Servidor local, puerto 5000


# Explicación detallada de las funciones:
# Ruta /:

# Sirve la interfaz principal (index.html) al cliente.
# Permite al usuario interactuar con la aplicación desde su navegador.
# Ruta /enviar:

# Recibe solicitudes POST con el contenido del correo (asunto, destinatario y mensaje) en formato JSON.
# Utiliza la función enviar_correo del módulo correo para procesar y enviar el correo.
# Responde con un JSON indicando el éxito o el fallo del envío.
# Ruta /recibir:

# Maneja solicitudes GET para recuperar correos almacenados.
# Utiliza la función recibir_correos para obtener una lista de correos desde el servidor o base de datos.
# Devuelve la lista como un JSON para que pueda ser utilizada por el frontend.
# Ejecución del servidor:

# Ejecuta el servidor en modo de depuración (debug=True) en 127.0.0.1:5000, lo que permite realizar pruebas locales y ver mensajes de error detallados.